import { useNavigate } from "react-router-dom";
import { Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lantern } from "@/components/Lantern";
import { Firework } from "@/components/Firework";
import { Horse } from "@/components/Horse";

const Home = () => {
  const navigate = useNavigate();

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
              <Horse className="text-secondary w-24 h-16 animate-float drop-shadow-lg" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
              </div>
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-secondary">马</span>年大吉
          </h1>
          <p className="text-foreground/80 text-lg">
            2026 新春祝福
          </p>

          {/* 装饰线 */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-secondary" />
            <span className="text-secondary text-2xl">福</span>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-secondary" />
          </div>
        </header>

        {/* 功能选择区 */}
        <main className="flex-1 flex flex-col items-center justify-center pb-8 gap-6">
          <p className="text-foreground/70 text-base text-center px-4 mb-4">
            选择一项开始您的新春祝福之旅
          </p>

          {/* 生成贺卡按钮 */}
          <Button
            onClick={() => navigate("/greeting")}
            size="lg"
            className="w-full max-w-xs bg-gradient-to-r from-secondary via-accent to-secondary text-secondary-foreground text-lg px-8 py-8 h-auto rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse-gold flex flex-col gap-2"
          >
            <Sparkles className="w-8 h-8" />
            <span>生成贺卡</span>
            <span className="text-sm font-normal opacity-80">AI为您创作专属祝福语</span>
          </Button>

          {/* 算算运势按钮 */}
          <Button
            onClick={() => navigate("/fortune")}
            size="lg"
            variant="outline"
            className="w-full max-w-xs border-2 border-secondary/60 text-foreground text-lg px-8 py-8 h-auto rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:bg-secondary/10 transition-all duration-300 flex flex-col gap-2"
          >
            <MessageCircle className="w-8 h-8 text-secondary" />
            <span>算算运势</span>
            <span className="text-sm font-normal opacity-70">与AI聊聊马年好运</span>
          </Button>

          {/* 底部装饰文字 */}
          <div className="pt-8 space-y-2">
            <p className="text-foreground/50 text-sm text-center">
              龙马精神 · 马到成功 · 一马当先
            </p>
          </div>
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

export default Home;
