import { findMatchingFAQ } from "./faq-data";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  sources?: {
    title: string;
    excerpt: string;
    url?: string;
  }[];
  timestamp: Date;
  isLoading?: boolean;
}

export async function processUserMessage(
  userMessage: string,
  chatHistory: Message[]
): Promise<Message> {
  // Find a matching FAQ from our "database"
  const matchingFAQ = await findMatchingFAQ(userMessage);

  if (matchingFAQ) {
    return {
      id: generateId(),
      role: "assistant",
      content: matchingFAQ.answer,
      sources: matchingFAQ.sources,
      timestamp: new Date(),
    };
  }

  // Default response if no match found
  return {
    id: generateId(),
    role: "assistant",
    content:
      "I don't have specific information about that in my knowledge base. Could you try rephrasing your question or ask about another topic?",
    timestamp: new Date(),
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Initial greeting message
export const initialMessage: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hi there! I'm your Smart FAQ Bot. I can answer questions about the  stock markit, based on your documentation. How can I help you today?",
  timestamp: new Date(),
};

// Example messages for demo/preview (empty by default)
export const exampleMessages: Message[] = [];
