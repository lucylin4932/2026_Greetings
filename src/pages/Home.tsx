import { useNavigate } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudPattern } from "@/components/CloudPattern";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* 云纹背景 */}
      <CloudPattern />

      {/* 主内容区 */}
      <div className="relative z-10 px-6 py-12 max-w-lg mx-auto min-h-screen flex flex-col">
        {/* 顶部留白 */}
        <div className="flex-[0.3]" />

        {/* 标题区 */}
        <header className="text-center mb-16">
          {/* 主标题 - 使用衬线字体 */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">
            <span className="text-primary">策马</span>
            <span className="text-foreground">新春</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <p className="text-muted-foreground text-base tracking-wider">
              2026 丙午马年
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent via-primary to-transparent" />
          </div>

          <p className="text-sm text-muted-foreground tracking-wide">
            运势与祝福
          </p>
        </header>

        {/* 功能选择区 */}
        <main className="flex-1 flex flex-col gap-5 mb-12">
          {/* 生成贺词按钮 */}
          <Button
            onClick={() => navigate("/greeting")}
            size="lg"
            className="group relative w-full bg-primary text-primary-foreground hover:bg-primary/90 h-auto py-8 px-6 rounded-2xl shadow-2xl shadow-primary/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl hover:shadow-primary/30 overflow-hidden"
          >
            {/* 流光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-serif font-bold mb-1">写贺词</div>
                  <div className="text-sm opacity-90 font-light">生成专属马年祝福</div>
                </div>
              </div>
            </div>
          </Button>

          {/* 算运势按钮 */}
          <Button
            onClick={() => navigate("/fortune")}
            size="lg"
            variant="outline"
            className="group relative w-full border-2 border-primary/30 hover:border-primary/60 bg-card/50 backdrop-blur-sm text-card-foreground h-auto py-8 px-6 rounded-2xl shadow-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
          >
            {/* 流光效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="relative flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-serif font-bold mb-1">算运势</div>
                  <div className="text-sm opacity-70 font-light">测测马年好运气</div>
                </div>
              </div>
            </div>
          </Button>

          {/* 装饰文字 */}
          <div className="mt-8 text-center space-y-3">
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground/60">
              <span className="tracking-widest">龙马精神</span>
              <span className="w-1 h-1 rounded-full bg-secondary/40" />
              <span className="tracking-widest">马到成功</span>
              <span className="w-1 h-1 rounded-full bg-secondary/40" />
              <span className="tracking-widest">一马当先</span>
            </div>
          </div>
        </main>

        {/* 底部 */}
        <footer className="text-center">
          <div className="inline-flex items-center justify-center gap-2 text-xs text-muted-foreground/50 tracking-wide">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-border" />
            <span>大吉大利</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-border" />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
