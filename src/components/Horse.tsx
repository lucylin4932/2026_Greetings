import { cn } from "@/lib/utils";

interface HorseProps {
  className?: string;
}

export const Horse = ({ className }: HorseProps) => {
  return (
    <svg
      className={cn("w-24 h-16 fill-current", className)}
      viewBox="0 0 100 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 简化的骏马剪影 */}
      <path
        d="M85 35 Q90 30 88 25 Q85 20 80 22 L78 18 Q75 12 70 15 L65 20 Q60 18 55 20 L50 22 Q45 20 40 22 L35 25 Q30 28 25 30 L20 32 Q15 33 12 35 L10 38 Q8 42 12 45 L18 48 Q22 50 25 48 L28 45 L30 50 Q32 55 35 52 L38 48 L45 50 Q48 55 52 52 L55 48 L60 50 Q63 55 67 52 L70 48 L75 50 Q78 55 82 52 L85 48 Q88 45 87 40 Z"
        className="drop-shadow-lg"
      />
      {/* 马鬃 */}
      <path
        d="M70 15 Q72 10 75 12 Q78 8 80 12 Q82 8 85 15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-80"
      />
      {/* 马尾 */}
      <path
        d="M10 38 Q5 35 8 40 Q4 42 8 45 Q3 48 10 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="opacity-80"
      />
    </svg>
  );
};
