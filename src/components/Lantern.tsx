import { cn } from "@/lib/utils";

interface LanternProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  delay?: number;
}

export const Lantern = ({ className, size = "md", delay = 0 }: LanternProps) => {
  const sizeClasses = {
    sm: "w-8 h-12",
    md: "w-12 h-18",
    lg: "w-16 h-24",
  };

  return (
    <div
      className={cn("relative animate-lantern-swing", sizeClasses[size], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 灯笼顶部 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-2 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-t-sm" />
      
      {/* 灯笼主体 */}
      <div className="absolute top-2 left-0 right-0 bottom-4 bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-full shadow-lg shadow-red-500/50">
        {/* 灯笼纹路 */}
        <div className="absolute inset-x-0 top-1/4 h-0.5 bg-yellow-500/60" />
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-yellow-500/60" />
        <div className="absolute inset-x-0 top-3/4 h-0.5 bg-yellow-500/60" />
        
        {/* 福字 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-yellow-400 font-bold text-xs drop-shadow-lg">福</span>
        </div>
      </div>
      
      {/* 灯笼底部装饰 */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-4 bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-b-sm" />
      
      {/* 流苏 */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-yellow-600" />
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full" />
    </div>
  );
};
