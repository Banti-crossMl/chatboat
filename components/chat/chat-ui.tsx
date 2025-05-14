"use client";

import { useEffect, useRef, useState } from "react";
import {
  Message,
  initialMessage,
  processUserMessage,
  generateId,
} from "@/lib/chat-utils";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { Button } from "@/components/ui/button";
import { ArrowDownCircle, Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handle new user message
  const handleSendMessage = async (content: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    // Add a loading message from the assistant
    const loadingMessage: Message = {
      id: generateId(),
      role: "assistant",
      content: "",
      isLoading: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsWaitingForResponse(true);

    // Process the message and get a response
    const response = await processUserMessage(content, messages);

    // Replace the loading message with the actual response
    setMessages((prev) => prev.map((msg) => (msg.isLoading ? response : msg)));

    setIsWaitingForResponse(false);
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle scroll to check if we need to show the scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100;

      setShowScrollButton(isScrolledUp);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([initialMessage]);
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col rounded-lg border bg-background/60 backdrop-blur-md shadow-md overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Smart FAQ Bot</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={handleClearChat}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear chat</span>
        </Button>
      </div>

      {/* Messages container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Scroll to bottom button */}
        {showScrollButton && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-20 right-6 h-8 w-8 rounded-full opacity-80 shadow-md"
            onClick={scrollToBottom}
          >
            <ArrowDownCircle className="h-4 w-4" />
            <span className="sr-only">Scroll to bottom</span>
          </Button>
        )}
      </div>

      {/* Chat input */}
      <div className="border-t bg-background/95 px-4 py-4">
        <ChatInput
          onSend={handleSendMessage}
          isWaiting={isWaitingForResponse}
        />
      </div>
    </div>
  );
}
