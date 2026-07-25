<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class AiSetting extends Model
{
    protected $table = 'ai_settings';

    protected $fillable = [
        'provider',
        'system_prompt',
        'knowledge_base',
        'model',
        'temperature',
        'max_tokens',
        'api_key',
        'openai_api_key',
        'gemini_api_key',
        'claude_api_key',
        'greeting_message',
        'fallback_message',
        'is_enabled',
        'allowed_modules',
        'rate_limit',
        'conversation_memory',
    ];

    protected $casts = [
        'temperature' => 'float',
        'max_tokens' => 'integer',
        'is_enabled' => 'boolean',
        'allowed_modules' => 'array',
        'rate_limit' => 'integer',
        'conversation_memory' => 'integer',
    ];

    // Safe Encryption / Decryption for OpenAI Key
    public function setOpenaiApiKeyAttribute($value)
    {
        if (!$value) {
            $this->attributes['openai_api_key'] = null;
            return;
        }
        try {
            $this->attributes['openai_api_key'] = Crypt::encryptString($value);
        } catch (\Exception $e) {
            $this->attributes['openai_api_key'] = $value;
        }
    }

    public function getOpenaiApiKeyAttribute($value)
    {
        if (!$value) return null;
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }

    // Safe Encryption / Decryption for Gemini Key
    public function setGeminiApiKeyAttribute($value)
    {
        if (!$value) {
            $this->attributes['gemini_api_key'] = null;
            return;
        }
        try {
            $this->attributes['gemini_api_key'] = Crypt::encryptString($value);
        } catch (\Exception $e) {
            $this->attributes['gemini_api_key'] = $value;
        }
    }

    public function getGeminiApiKeyAttribute($value)
    {
        if (!$value) return null;
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }

    // Safe Encryption / Decryption for Claude Key
    public function setClaudeApiKeyAttribute($value)
    {
        if (!$value) {
            $this->attributes['claude_api_key'] = null;
            return;
        }
        try {
            $this->attributes['claude_api_key'] = Crypt::encryptString($value);
        } catch (\Exception $e) {
            $this->attributes['claude_api_key'] = $value;
        }
    }

    public function getClaudeApiKeyAttribute($value)
    {
        if (!$value) return null;
        try {
            return Crypt::decryptString($value);
        } catch (\Exception $e) {
            return $value;
        }
    }
}
