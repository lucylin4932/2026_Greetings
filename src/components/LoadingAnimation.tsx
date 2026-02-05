import { Loader2 } from "lucide-react";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12 animate-fade-in">
      {/* 主加载图标 */}
      <div className="relative">
        {/* 旋转的加载器 */}
        <Loader2 className="w-16 h-16 text-primary animate-spin drop-shadow-lg" />
        
        {/* 外圈脉冲效果 */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-20 h-20 border-2 border-primary/20 rounded-full animate-ping" />
        </div>
      </div>

      {/* 加载文字 */}
      <div className="text-center space-y-2">
        <p className="text-lg font-serif text-primary font-bold animate-pulse">
          正在生成贺词
        </p>
        <p className="text-sm text-muted-foreground">
          请稍候片刻...
        </p>
      </div>

      {/* 加载点 */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
};
