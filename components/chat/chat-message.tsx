"use client";

import { useEffect, useState } from "react";
import { Message } from "@/lib/chat-utils";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(message.role === "assistant" && !message.isLoading);
  const [showSources, setShowSources] = useState(false);
  
  // Typing effect for assistant messages
  useEffect(() => {
    if (message.role === "assistant" && !message.isLoading) {
      setIsTyping(true);
      let currentText = "";
      const content = message.content;
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex < content.length) {
          currentText += content.charAt(charIndex);
          setTypedText(currentText);
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15); // Speed of typing
      
      return () => clearInterval(typingInterval);
    }
  }, [message.content, message.isLoading, message.role]);
  
  const isUser = message.role === "user";
  
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 py-4 flex item-center",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border bg-primary/10 flex items-center justify-center">
          <span className="text-xs font-semibold">AI</span>
        </Avatar>
      )}
      
      <div
        className={cn(
          "flex max-w-[80%] flex-col gap-2 rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted/60 backdrop-blur-sm"
        )}
      >
        {message.isLoading ? (
          <div className="flex items-center gap-2">
            <span className="animate-pulse">●</span>
            <span className="animate-pulse animation-delay-200">●</span>
            <span className="animate-pulse animation-delay-400">●</span>
          </div>
        ) : (
          <>
            <div className="whitespace-pre-wrap">
              {isUser || !isTyping ? message.content : typedText}
              {isTyping && <span className="ml-1 animate-blink">|</span>}
            </div>
            
            {message.sources && message.sources.length > 0 && (
              <div className="mt-2">
                <Collapsible
                  open={showSources}
                  onOpenChange={setShowSources}
                  className="w-full"
                >
                  <div className="flex items-center">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
                      >
                        {showSources ? (
                          <ChevronUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ChevronDown className="h-3 w-3 mr-1" />
                        )}
                        {showSources ? "Hide" : "Show"} sources ({message.sources.length})
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {message.sources.map((source, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-background/50 p-2 text-xs"
                      >
                        <div className="font-medium flex items-center justify-between">
                          {source.title}
                          {source.url && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              asChild
                            >
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3" />
                                <span className="sr-only">Open source</span>
                              </a>
                            </Button>
                          )}
                        </div>
                        <div className="mt-1 text-muted-foreground">
                          {source.excerpt}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
          </>
        )}
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 border bg-accent flex items-center justify-center">
          <span className="text-xs font-semibold">You</span>
        </Avatar>
      )}
    </div>
  );
}