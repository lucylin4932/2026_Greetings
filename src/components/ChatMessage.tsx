import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isLoading?: boolean;
}

export const ChatMessage = ({ content, isUser, isLoading }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* 头像 */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border",
          isUser
            ? "bg-primary border-primary/20"
            : "bg-secondary/20 border-secondary/30"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-primary-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-secondary" />
        )}
      </div>

      {/* 消息气泡 */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm transition-all duration-300",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-md"
            : "bg-card border border-border/50 text-card-foreground rounded-tl-md"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-light">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // 自定义样式
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-sm text-card-foreground">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-sm">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-sm">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed text-card-foreground">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                em: ({ children }) => <em className="italic text-secondary">{children}</em>,
                h1: ({ children }) => <h1 className="text-base font-serif font-bold mb-2 text-primary">{children}</h1>,
                h2: ({ children }) => <h2 className="text-sm font-serif font-bold mb-2 text-primary">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-serif font-semibold mb-1 text-foreground">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-secondary/40 pl-3 italic my-2 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-3 rounded-lg my-2 overflow-x-auto text-xs font-mono">{children}</pre>
                ),
                hr: () => <hr className="my-3 border-border/50" />,
                a: ({ children, href }) => (
                  <a href={href} className="text-secondary hover:text-secondary/80 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
