import { Container } from "@/components/layout/container";
import { ChatUI } from "@/components/chat/chat-ui";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-accent/5 p-4 sm:p-8">
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Smart FAQ Bot
          </h1>
          <p className="mt-2 text-muted-foreground">
            Ask me anything about stock markit
          </p>
        </div>

        <div className="flex-1 overflow-hidden rounded-xl border shadow-xl h-[70vh]">
          <ChatUI />
        </div>
      </div>
    </main>
  );
}
