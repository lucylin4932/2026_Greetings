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
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md",
          isUser
            ? "bg-gradient-to-br from-secondary to-accent"
            : "bg-gradient-to-br from-primary to-red-700"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-secondary-foreground" />
        ) : (
          <Bot className="w-5 h-5 text-foreground" />
        )}
      </div>

      {/* 消息气泡 */}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 shadow-lg",
          isUser
            ? "bg-gradient-to-br from-secondary to-accent text-secondary-foreground rounded-tr-sm"
            : "bg-card border border-secondary/30 text-card-foreground rounded-tl-sm"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm max-w-none prose-invert">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // 自定义样式
                p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-secondary">{children}</strong>,
                em: ({ children }) => <em className="italic text-accent">{children}</em>,
                h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-secondary">{children}</h1>,
                h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-secondary">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-secondary">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-secondary/50 pl-3 italic my-2 text-foreground/80">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-2 rounded my-2 overflow-x-auto text-xs">{children}</pre>
                ),
                hr: () => <hr className="my-3 border-secondary/30" />,
                a: ({ children, href }) => (
                  <a href={href} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
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
