import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudPattern } from "@/components/CloudPattern";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { GreetingCard } from "@/components/GreetingCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
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

  const resetToHome = () => {
    setGreeting("");
    setImageUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* 云纹背景 */}
      <CloudPattern />

      {/* 主内容区 */}
      <div className="relative z-10 px-6 py-8 max-w-lg mx-auto min-h-screen flex flex-col">
        {/* 返回按钮 */}
        <div className="absolute top-4 left-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-foreground hover:bg-muted rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        {/* 标题区 */}
        <header className="text-center pt-16 pb-8">
          {/* 主标题 */}
          <h1 className="text-4xl font-serif font-bold mb-3">
            <span className="text-primary">策马</span>
            <span className="text-foreground">新春</span>
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-10 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="text-muted-foreground text-sm tracking-wider">
              新春贺词生成
            </p>
            <div className="h-px w-10 bg-gradient-to-l from-transparent via-primary to-transparent" />
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
              onBackHome={resetToHome}
            />
          ) : (
            /* 初始状态 - 生成按钮 */
            <div className="text-center space-y-6 w-full max-w-sm">
              <p className="text-muted-foreground text-sm leading-relaxed px-4">
                点击下方按钮，AI将为您生成<br/>
                独一无二的马年新春祝福语
              </p>

              <Button
                onClick={generateGreeting}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-auto py-6 rounded-2xl font-serif text-lg shadow-2xl shadow-primary/20 transition-all duration-500 hover:scale-[1.02]"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                生成贺词
              </Button>

              {/* 底部装饰文字 */}
              <div className="pt-8">
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground/50">
                  <span className="tracking-widest">龙马精神</span>
                  <span className="w-1 h-1 rounded-full bg-secondary/40" />
                  <span className="tracking-widest">马到成功</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 底部 */}
        <footer className="text-center py-4">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-muted-foreground/40">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
            <span className="tracking-wide">祝您新春快乐</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
