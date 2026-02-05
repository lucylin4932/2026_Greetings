import { cn } from "@/lib/utils";

interface CloudPatternProps {
  className?: string;
}

export const CloudPattern = ({ className }: CloudPatternProps) => {
  return (
    <div className={cn("fixed inset-0 pointer-events-none overflow-hidden opacity-30", className)}>
      {/* 祥云纹样 - SVG */}
      <svg className="absolute top-10 right-10 w-32 h-32 text-secondary/20 animate-breathe" viewBox="0 0 100 100">
        <path
          d="M20,50 Q30,30 50,30 Q70,30 80,50 Q70,60 50,55 Q30,60 20,50 Z"
          fill="currentColor"
          className="drop-shadow-lg"
        />
      </svg>
      
      <svg className="absolute bottom-20 left-10 w-40 h-40 text-primary/15 animate-breathe" style={{ animationDelay: '2s' }} viewBox="0 0 100 100">
        <path
          d="M15,55 Q25,35 45,35 Q65,35 75,55 Q65,65 45,60 Q25,65 15,55 Z"
          fill="currentColor"
          className="drop-shadow-lg"
        />
      </svg>

      <svg className="absolute top-1/3 left-1/4 w-24 h-24 text-accent/10 animate-breathe" style={{ animationDelay: '4s' }} viewBox="0 0 100 100">
        <path
          d="M25,50 Q35,35 50,35 Q65,35 75,50 Q65,60 50,58 Q35,60 25,50 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
