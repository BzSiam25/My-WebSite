<?php

namespace App\Services;

use App\Models\AiSetting;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiLlmService
{
    private AiKnowledgeService $knowledgeService;

    public function __construct(AiKnowledgeService $knowledgeService)
    {
        $this->knowledgeService = $knowledgeService;
    }

    /**
     * Process chat request through configured LLM Provider or Dynamic Knowledge Engine.
     */
    public function processChat(string $userMessage, array $history = []): array
    {
        $aiSettings = AiSetting::first();

        // 1. Check if AI Assistant is enabled by Admin
        if ($aiSettings && !$aiSettings->is_enabled) {
            return [
                'reply' => $aiSettings->fallback_message ?: "The AI Assistant is currently disabled by the Administrator.",
                'mode' => 'disabled'
            ];
        }

        // 2. Fetch live dynamic database context using RAG
        $dynamicContext = $this->knowledgeService->searchRelevantContext($userMessage);

        $systemPrompt = $aiSettings->system_prompt ?? "You are Siam's official Portfolio AI Assistant. Answer questions concisely and professionally based strictly on Siam's portfolio context.";
        $model = $aiSettings->model ?? 'gemini-1.5-flash';
        $provider = strtolower($aiSettings->provider ?? 'gemini');
        $temperature = (float)($aiSettings->temperature ?? 0.7);
        $maxTokens = (int)($aiSettings->max_tokens ?? 1000);

        // 3. Resolve Provider Key
        $apiKey = match ($provider) {
            'openai' => $aiSettings->openai_api_key ?: $aiSettings->api_key,
            'claude' => $aiSettings->claude_api_key ?: $aiSettings->api_key,
            default => $aiSettings->gemini_api_key ?: $aiSettings->api_key,
        };

        // 4. Fallback Knowledge Mode if key is empty
        if (!$apiKey) {
            return [
                'reply' => $this->generateFallbackReply($userMessage, $dynamicContext),
                'mode' => 'fallback_knowledge'
            ];
        }

        // 5. Invoke Selected LLM Provider
        try {
            if ($provider === 'openai') {
                return $this->invokeOpenAI($apiKey, $model, $systemPrompt, $dynamicContext, $userMessage, $history, $temperature, $maxTokens);
            } elseif ($provider === 'claude') {
                return $this->invokeClaude($apiKey, $model, $systemPrompt, $dynamicContext, $userMessage, $history, $temperature, $maxTokens);
            } else {
                return $this->invokeGemini($apiKey, $model, $systemPrompt, $dynamicContext, $userMessage, $history, $temperature, $maxTokens);
            }
        } catch (\Exception $e) {
            Log::error('AI LLM Execution Error: ' . $e->getMessage());
            return [
                'reply' => $this->generateFallbackReply($userMessage, $dynamicContext),
                'mode' => 'fallback_error'
            ];
        }
    }

    /**
     * Invoke Google Gemini API
     */
    private function invokeGemini(string $apiKey, string $model, string $systemPrompt, string $context, string $userMessage, array $history, float $temperature, int $maxTokens): array
    {
        $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";

        $contents = [];
        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => "System Instructions:\n{$systemPrompt}\n\nLive Portfolio Database Context:\n{$context}\n\nRule: Only answer using this context. If information is not present in the context, say 'I don't currently have information about that in my portfolio.'"]]
        ];
        $contents[] = [
            'role' => 'model',
            'parts' => [['text' => "Understood. I will strictly act as Siam's AI assistant and only answer based on this live context."]]
        ];

        foreach ($history as $turn) {
            $contents[] = [
                'role' => $turn['role'] === 'user' ? 'user' : 'model',
                'parts' => [['text' => $turn['content'] ?? $turn['text'] ?? '']]
            ];
        }

        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $userMessage]]
        ];

        $response = Http::post($url, [
            'contents' => $contents,
            'generationConfig' => [
                'temperature' => $temperature,
                'maxOutputTokens' => $maxTokens,
            ]
        ]);

        if ($response->successful()) {
            $data = $response->json();
            $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
            if ($reply) {
                return ['reply' => $reply, 'mode' => 'gemini_api'];
            }
        }

        return ['reply' => $this->generateFallbackReply($userMessage, $context), 'mode' => 'fallback_gemini'];
    }

    /**
     * Invoke OpenAI Chat Completions API
     */
    private function invokeOpenAI(string $apiKey, string $model, string $systemPrompt, string $context, string $userMessage, array $history, float $temperature, int $maxTokens): array
    {
        $url = "https://api.openai.com/v1/chat/completions";

        $messages = [];
        $messages[] = [
            'role' => 'system',
            'content' => "{$systemPrompt}\n\nLive Portfolio Database Context:\n{$context}\n\nRule: Strictly answer based on this context. If missing, say 'I don't currently have information about that in my portfolio.'"
        ];

        foreach ($history as $turn) {
            $messages[] = [
                'role' => $turn['role'] === 'user' ? 'user' : 'assistant',
                'content' => $turn['content'] ?? $turn['text'] ?? ''
            ];
        }

        $messages[] = ['role' => 'user', 'content' => $userMessage];

        $response = Http::withToken($apiKey)->post($url, [
            'model' => $model ?: 'gpt-4o-mini',
            'messages' => $messages,
            'temperature' => $temperature,
            'max_tokens' => $maxTokens,
        ]);

        if ($response->successful()) {
            $reply = $response->json()['choices'][0]['message']['content'] ?? null;
            if ($reply) {
                return ['reply' => $reply, 'mode' => 'openai_api'];
            }
        }

        return ['reply' => $this->generateFallbackReply($userMessage, $context), 'mode' => 'fallback_openai'];
    }

    /**
     * Invoke Anthropic Claude API
     */
    private function invokeClaude(string $apiKey, string $model, string $systemPrompt, string $context, string $userMessage, array $history, float $temperature, int $maxTokens): array
    {
        $url = "https://api.anthropic.com/v1/messages";

        $messages = [];
        foreach ($history as $turn) {
            $messages[] = [
                'role' => $turn['role'] === 'user' ? 'user' : 'assistant',
                'content' => $turn['content'] ?? $turn['text'] ?? ''
            ];
        }
        $messages[] = ['role' => 'user', 'content' => $userMessage];

        $response = Http::withHeaders([
            'x-api-key' => $apiKey,
            'anthropic-version' => '2023-06-01',
            'content-type' => 'application/json',
        ])->post($url, [
            'model' => $model ?: 'claude-3-5-sonnet-20240620',
            'system' => "{$systemPrompt}\n\nLive Portfolio Database Context:\n{$context}\n\nRule: Strictly answer based on this context.",
            'messages' => $messages,
            'max_tokens' => $maxTokens,
            'temperature' => $temperature,
        ]);

        if ($response->successful()) {
            $reply = $response->json()['content'][0]['text'] ?? null;
            if ($reply) {
                return ['reply' => $reply, 'mode' => 'claude_api'];
            }
        }

        return ['reply' => $this->generateFallbackReply($userMessage, $context), 'mode' => 'fallback_claude'];
    }

    /**
     * Generate structured response from live database context when LLM is unconfigured.
     */
    private function generateFallbackReply(string $userMessage, string $context): string
    {
        $lowerMsg = strtolower($userMessage);

        if (str_contains($lowerMsg, 'project') || str_contains($lowerMsg, 'built') || str_contains($lowerMsg, 'work')) {
            if (preg_match('/## PROJECTS & CASE STUDIES\s+([\s\S]*?)(?=\n##|$)/', $context, $matches)) {
                return "Here are the projects retrieved directly from Siam's live portfolio database:\n\n" . trim($matches[1]);
            }
        }

        if (str_contains($lowerMsg, 'skill') || str_contains($lowerMsg, 'tech') || str_contains($lowerMsg, 'stack')) {
            if (preg_match('/## TECHNICAL SKILLS & ARSENAL\s+([\s\S]*?)(?=\n##|$)/', $context, $matches)) {
                return "Here are Siam's technical skills retrieved from the live database:\n\n" . trim($matches[1]);
            }
        }

        if (str_contains($lowerMsg, 'research') || str_contains($lowerMsg, 'paper') || str_contains($lowerMsg, 'publication')) {
            if (preg_match('/## RESEARCH PAPERS & PUBLICATIONS\s+([\s\S]*?)(?=\n##|$)/', $context, $matches)) {
                return "Here is Siam's published research from the database:\n\n" . trim($matches[1]);
            }
        }

        if (str_contains($lowerMsg, 'contact') || str_contains($lowerMsg, 'email') || str_contains($lowerMsg, 'reach')) {
            if (preg_match('/## CONTACT DETAILS\s+([\s\S]*?)(?=\n##|$)/', $context, $matches)) {
                return "Here is Siam's contact information:\n\n" . trim($matches[1]);
            }
        }

        if (str_contains($lowerMsg, 'experience') || str_contains($lowerMsg, 'job') || str_contains($lowerMsg, 'role')) {
            if (preg_match('/## WORK EXPERIENCE\s+([\s\S]*?)(?=\n##|$)/', $context, $matches)) {
                return "Here is Siam's work experience:\n\n" . trim($matches[1]);
            }
        }

        return "Hello! I am Siam's Portfolio AI Assistant operating on live database knowledge:\n\n" . $context;
    }
}
