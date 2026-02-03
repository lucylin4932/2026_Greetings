import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lantern } from "@/components/Lantern";
import { Firework } from "@/components/Firework";
import { Horse } from "@/components/Horse";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { GreetingCard } from "@/components/GreetingCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const { toast } = useToast();

  const generateGreeting = async () => {
    setIsLoading(true);
    setGreeting("");
    // 不清除imageUrl，保留已生成的图片

    try {
      const { data, error } = await supabase.functions.invoke("generate-greeting");

      if (error) throw error;

      if (data?.greeting) {
        setGreeting(data.greeting);
      } else {
        throw new Error("未能生成贺词");
      }
    } catch (error) {
      console.error("Error generating greeting:", error);
      const errorMessage = error instanceof Error ? error.message : "请稍后再试";
      toast({
        title: "生成失败",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async () => {
    if (!greeting) return;
    
    setIsGeneratingImage(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-card-image", {
        body: { greeting },
      });

      console.log("Image function response:", { data, error });

      if (error) {
        console.error("Function error:", error);
        throw new Error(error.message || "API调用失败");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.imageUrl) {
        setImageUrl(data.imageUrl);
        toast({
          title: "贺卡生成成功",
          description: "您可以下载保存贺卡了",
        });
      } else {
        throw new Error("未能生成图片");
      }
    } catch (error) {
      console.error("Error generating image:", error);
      const errorMessage = error instanceof Error ? error.message : "请稍后再试";
      toast({
        title: "图片生成失败",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyGreeting = async () => {
    try {
      await navigator.clipboard.writeText(greeting);
      toast({
        title: "复制成功",
        description: "贺词已复制到剪贴板",
      });
    } catch {
      toast({
        title: "复制失败",
        description: "请手动复制",
        variant: "destructive",
      });
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "马年贺卡_2026.png";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-primary/10 to-background overflow-hidden">
      {/* 烟花效果 */}
      <Firework />

      {/* 灯笼装饰 */}
      <div className="fixed top-0 left-4 z-10">
        <Lantern size="md" delay={0} />
      </div>
      <div className="fixed top-0 right-4 z-10">
        <Lantern size="md" delay={500} />
      </div>
      <div className="fixed top-0 left-1/4 z-10 hidden sm:block">
        <Lantern size="sm" delay={250} />
      </div>
      <div className="fixed top-0 right-1/4 z-10 hidden sm:block">
        <Lantern size="sm" delay={750} />
      </div>

      {/* 主内容区 */}
      <div className="relative z-20 px-4 py-8 max-w-md mx-auto min-h-screen flex flex-col">
        {/* 标题区 */}
        <header className="text-center pt-16 pb-8">
          {/* 马年图标 */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Horse className="text-secondary w-20 h-14 animate-float drop-shadow-lg" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
              </div>
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-secondary">马</span>年大吉
          </h1>
          <p className="text-foreground/80 text-base">
            2026 新春贺词生成器
          </p>

          {/* 装饰线 */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-xl">福</span>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
        </header>

        {/* 内容区 */}
        <main className="flex-1 flex flex-col items-center justify-center pb-8">
          {isLoading ? (
            <LoadingAnimation />
          ) : greeting ? (
            <GreetingCard
              greeting={greeting}
              imageUrl={imageUrl}
              isGeneratingImage={isGeneratingImage}
              onCopy={copyGreeting}
              onGenerateImage={generateImage}
              onRegenerate={generateGreeting}
              onDownloadImage={downloadImage}
            />
          ) : (
            /* 初始状态 - 生成按钮 */
            <div className="text-center space-y-6">
              <p className="text-foreground/70 text-base leading-relaxed px-4">
                点击下方按钮，AI将为您生成<br/>
                独一无二的马年新春祝福语
              </p>

              <Button
                onClick={generateGreeting}
                size="lg"
                className="bg-gradient-to-r from-secondary via-accent to-secondary text-secondary-foreground text-lg px-10 py-6 h-auto rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-gold"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                生成贺词
              </Button>

              {/* 底部装饰文字 */}
              <div className="pt-8 space-y-2">
                <p className="text-foreground/50 text-sm">
                  龙马精神 · 马到成功 · 一马当先
                </p>
              </div>
            </div>
          )}
        </main>

        {/* 底部 */}
        <footer className="text-center py-4">
          <p className="text-foreground/40 text-xs">
            祝您新春快乐，万事如意
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
