import { cn } from "@/lib/utils";

interface FluidHorseProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const FluidHorse = ({ className, size = "md" }: FluidHorseProps) => {
  const sizeClasses = {
    sm: "w-16 h-12",
    md: "w-24 h-18",
    lg: "w-32 h-24",
  };

  return (
    <svg
      className={cn("fill-current", sizeClasses[size], className)}
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 流体金属马 - 简化抽象线条 */}
      <defs>
        <linearGradient id="liquidGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(51 100% 50%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(45 100% 65%)" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(51 100% 50%)" stopOpacity="1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* 马身体主体 - 流畅曲线 */}
      <path
        d="M 95 45 Q 92 35 88 30 L 85 25 Q 82 18 75 20 L 70 25 Q 65 23 60 25 L 55 28 Q 48 26 42 29 L 35 33 Q 28 36 22 40 L 15 45 Q 10 50 15 55 L 20 58 Q 24 60 28 58 L 32 54 L 35 60 Q 38 65 42 62 L 45 58 L 52 62 Q 56 66 60 62 L 63 58 L 70 62 Q 74 66 78 62 L 82 58 L 88 62 Q 92 66 95 62 L 98 58 Q 100 54 98 48 Z"
        fill="url(#liquidGold)"
        filter="url(#glow)"
        className="drop-shadow-2xl"
      />
      
      {/* 马鬃 - 流动线条 */}
      <path
        d="M 75 20 Q 78 14 82 16 Q 84 12 88 16 Q 90 10 94 20"
        fill="none"
        stroke="url(#liquidGold)"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-90"
      />
      
      {/* 马尾 - 飘逸 */}
      <path
        d="M 15 45 Q 8 42 10 48 Q 6 50 10 54 Q 4 56 12 58"
        fill="none"
        stroke="url(#liquidGold)"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-90"
      />
    </svg>
  );
};
