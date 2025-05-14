"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  isWaiting: boolean;
}

export function ChatInput({ onSend, isWaiting }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim() && !isWaiting) {
      onSend(input.trim());
      setInput("");

      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center space-x-2"
    >
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question..."
        className="min-h-[56px] w-full resize-none rounded-full border border-input bg-background px-4 py-4 pr-12 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
        disabled={isWaiting}
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isWaiting || !input.trim()}
        className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
