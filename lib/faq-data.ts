// Mock data for FAQ responses
export interface FAQItem {
  question: string;
  answer: string;
  sources?: Source[];
}

export interface Source {
  title: string;
  excerpt: string;
  url?: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What is the Smart FAQ Bot?",
    answer:
      "The Smart FAQ Bot is an AI-powered assistant that answers questions based on your organization's internal documents. It provides direct, relevant answers to your queries without requiring you to search through documents manually.",
    sources: [
      {
        title: "Smart FAQ Bot Documentation",
        excerpt:
          "The Smart FAQ Bot uses advanced natural language processing to understand questions and provide accurate answers based on your organization's knowledge base.",
      },
    ],
  },
  {
    question: "How does the Smart FAQ Bot work?",
    answer:
      "The Smart FAQ Bot works by analyzing your question, searching through our database of internal documents, and finding the most relevant information to answer your query. It uses advanced NLP techniques to understand context and provide accurate responses.",
    sources: [
      {
        title: "Technology Overview",
        excerpt:
          "Our system uses semantic search and machine learning to match questions with the most relevant document passages.",
      },
      {
        title: "FAQ Bot Architecture",
        excerpt:
          "The bot retrieves information from indexed documents and formats responses in natural language for easy understanding.",
      },
    ],
  },
  {
    question: "Can I ask follow-up questions?",
    answer:
      "Yes, you can ask follow-up questions! The Smart FAQ Bot maintains context within a conversation, so you can ask related questions without having to provide full context each time. This creates a more natural conversation flow.",
    sources: [
      {
        title: "User Guide",
        excerpt:
          "The chat interface supports multi-turn conversations, allowing users to ask follow-up questions for clarification or additional information.",
      },
    ],
  },
  {
    question: "What types of documents can the Smart FAQ Bot search?",
    answer:
      "The Smart FAQ Bot can search through a wide variety of document types including PDFs, Word documents, PowerPoint presentations, Excel spreadsheets, Markdown files, HTML pages, and plain text files. The system automatically extracts and indexes the content from these documents.",
    sources: [
      {
        title: "Supported Document Types",
        excerpt:
          "Our system supports multiple document formats including PDF, DOCX, PPTX, XLSX, MD, HTML, and TXT files.",
      },
      {
        title: "Content Processing Pipeline",
        excerpt:
          "Documents are processed through our extraction pipeline that handles different formats and structures appropriately.",
      },
    ],
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, your data is secure. The Smart FAQ Bot operates within your organization's security perimeter. All data is encrypted in transit and at rest, and we adhere to strict access controls to ensure only authorized personnel can access the system. Your documents never leave your secure environment.",
    sources: [
      {
        title: "Security Documentation",
        excerpt:
          "All data is encrypted using industry-standard protocols, and the system operates within your organization's security boundaries.",
      },
      {
        title: "Compliance Overview",
        excerpt:
          "Our service meets enterprise security requirements including SOC 2, GDPR, and HIPAA compliance where applicable.",
      },
    ],
  },
];

// Simulated response delay (ms) - would be removed in production
export const SIMULATED_DELAY = 1000;

// Function to find a matching FAQ or return null
export function findMatchingFAQ(query: string): Promise<FAQItem | null> {
  return new Promise((resolve) => {
    // Convert query to lowercase for case-insensitive matching
    const normalizedQuery = query.toLowerCase();
    
    // Find FAQ items that match the query (simplified for demo)
    const matchingItem = faqData.find((item) => {
      return (
        item.question.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(item.question.toLowerCase().slice(0, 10))
      );
    });
    
    // Simulate API delay
    setTimeout(() => {
      resolve(matchingItem || null);
    }, SIMULATED_DELAY);
  });
}