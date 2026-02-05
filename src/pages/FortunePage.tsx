import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FluidHorse } from "@/components/FluidHorse";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const FortunePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "您好！我是马年运势大师，专门为您预测2026马年的运势。您可以问我关于事业、财运、感情、健康等方面的问题，让我为您指点迷津！",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // 添加用户消息
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-fortune", {
        body: { message: content },
      });

      console.log("Chat response:", { data, error });

      if (error) {
        throw new Error(error.message || "请求失败");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.reply) {
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: data.reply,
          isUser: false,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("未收到回复");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = error instanceof Error ? error.message : "请稍后再试";
      toast({
        title: "发送失败",
        description: errorMessage,
        variant: "destructive",
      });
      // 移除用户消息如果失败
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col relative">
      {/* 头部 */}
      <header className="relative z-20 px-4 py-4 border-b border-border/50 bg-background/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-foreground hover:bg-muted rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <FluidHorse className="text-primary w-10 h-7" size="sm" />
              <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-secondary animate-sparkle" />
            </div>
            <div>
              <h1 className="text-lg font-bold font-serif text-foreground">马年运势大师</h1>
              <p className="text-xs text-muted-foreground">2026 新春运势预测</p>
            </div>
          </div>
        </div>
      </header>

      {/* 聊天区域 */}
      <main className="flex-1 overflow-y-auto px-4 py-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
            />
          ))}
          {isLoading && (
            <ChatMessage
              content=""
              isUser={false}
              isLoading={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* 输入区域 */}
      <footer className="relative z-20 px-4 py-4 border-t border-border/50 bg-background/95 backdrop-blur-md">
        <div className="max-w-2xl mx-auto">
          <ChatInput
            onSend={handleSendMessage}
            disabled={isLoading}
            placeholder="问问您的马年运势..."
          />
          <p className="text-center text-xs text-muted-foreground/60 mt-3 tracking-wide">
            运势仅供娱乐参考·祝您马年大吉
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FortunePage;
