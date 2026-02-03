import { Horse } from "./Horse";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* 奔跑的马动画 */}
      <div className="relative w-full h-20 overflow-hidden">
        <Horse className="absolute text-secondary animate-horse-run" />
      </div>
      
      {/* 加载文字 */}
      <div className="flex items-center gap-2">
        <span className="text-foreground text-lg">正在为您撰写马年贺词</span>
        <span className="flex gap-1">
          <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
      
      {/* 进度条 */}
      <div className="w-48 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-secondary to-accent animate-pulse rounded-full w-2/3" />
      </div>
    </div>
  );
};
