"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User as UserIcon, MoreHorizontal } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi there! I'm your NutriSense AI Advisor. How can I help you adapt your diet today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response delay
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Based on your current goal to build muscle, I'd suggest adding 30g of protein to your next meal. A portion of grilled chicken or a nice whey protein shake would be perfect! Do you need recipes?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] max-w-3xl mx-auto w-full animate-fade-up">
      <div className="flex items-center gap-3 p-4 bg-surface/50 backdrop-blur-md rounded-t-3xl border border-border border-b-0">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold">NutriSense AI</h1>
          <p className="text-sm text-green-500 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-surface/30 backdrop-blur-sm border-x border-border space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${isUser ? "bg-accent text-accent-foreground" : "bg-primary/20 text-primary"}`}>
                {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                isUser 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-surface border border-border rounded-tl-sm shadow-sm"
              }`}>
                <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <span className={`text-[10px] block mt-2 ${isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground"}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full flex-shrink-0 bg-primary/20 text-primary flex items-center justify-center mt-1">
                <Bot className="w-4 h-4" />
             </div>
             <div className="bg-surface border border-border rounded-2xl rounded-tl-sm px-5 py-4 w-16 flex items-center justify-center">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground animate-pulse" />
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-surface/80 backdrop-blur-md rounded-b-3xl border border-border">
        <div className="relative flex items-end gap-2 bg-background border border-border rounded-3xl p-2 focus-within:border-primary transition-colors focus-within:ring-1 focus-within:ring-primary shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a meal, recipe, or your macros..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent resize-none outline-none px-4 py-3 placeholder:text-muted-foreground"
            rows={1}
            style={{ height: 'auto' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 flex-shrink-0 bg-primary text-primary-foreground rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 mb-0.5"
          >
            <Send className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
