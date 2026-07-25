import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Copy, Check, Trash2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I am Siam's Portfolio AI Assistant. Ask me anything about his projects, skills, experience, or research!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages
        .filter((m) => m.id !== '1')
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          content: m.content,
        }));

      const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
      const response = await fetch(`${apiBase}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg.content,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const resData = await response.json();
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: 'assistant', content: resData.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I don't currently have information about that in my portfolio.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRegenerate = async () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMessage) {
      handleSend(lastUserMessage.content);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Chat history cleared. How can I help you explore Siam's portfolio?",
      },
    ]);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
          aria-label="Open AI Assistant"
        >
          <MessageSquare className="h-6 w-6 text-primary-foreground" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-2.5rem)] h-[620px] max-h-[calc(100vh-7rem)] bg-card border border-border/70 rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/60 bg-card/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-foreground leading-tight">
                    Ask Siam (AI Assistant)
                  </h3>
                  <p className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live CMS Knowledge Mode
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  title="Clear Chat History"
                  aria-label="Clear Chat History"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Assistant"
                  className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-muted/5 custom-scrollbar"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`shrink-0 h-8 w-8 rounded-xl flex items-center justify-center ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary border border-border/60 text-foreground'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary" />
                    )}
                  </div>

                  <div
                    className={`group relative max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground font-medium rounded-tr-sm shadow-sm'
                        : 'bg-card border border-border/60 rounded-tl-sm text-foreground shadow-sm'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="prose prose-xs dark:prose-invert max-w-none text-foreground leading-relaxed">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ href, children }) => {
                              if (href && href.startsWith('/')) {
                                return (
                                  <Link
                                    to={href}
                                    className="text-primary underline font-semibold hover:opacity-80"
                                  >
                                    {children}
                                  </Link>
                                );
                              }
                              return (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary underline font-semibold hover:opacity-80"
                                >
                                  {children}
                                </a>
                              );
                            },
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span>{msg.content}</span>
                    )}

                    {msg.role === 'assistant' && (
                      <div className="absolute -bottom-6 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-card/90 backdrop-blur-md border border-border/50 px-1.5 py-0.5 rounded-lg shadow-sm z-10">
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 px-1 py-0.5"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                        <button
                          onClick={handleRegenerate}
                          className="text-[10px] text-muted-foreground hover:text-foreground flex items-center gap-1 px-1 py-0.5 border-l border-border/50"
                          title="Regenerate response"
                        >
                          <RotateCcw className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="shrink-0 h-8 w-8 rounded-xl bg-secondary border border-border/60 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-card border border-border/60 rounded-2xl rounded-tl-sm p-3.5 flex items-center gap-1.5 w-16 h-9">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input & Quick Suggestions Footer */}
            <div className="p-3 border-t border-border/60 bg-card">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Siam's projects, skills, research..."
                  className="flex-1 h-9 bg-background border border-border/70 rounded-full px-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="h-9 w-9 rounded-full shrink-0"
                  size="icon"
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* Dynamic Suggestion Pills */}
              <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5 no-scrollbar">
                {[
                  'What projects have you built?',
                  'Top Skills?',
                  'Current Focus?',
                  'Work Experience?',
                  'Published Research?',
                  'Contact Info?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="shrink-0 text-[11px] px-2.5 py-1 rounded-full border border-border/60 bg-secondary/40 hover:bg-secondary transition-colors whitespace-nowrap font-medium text-muted-foreground hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
