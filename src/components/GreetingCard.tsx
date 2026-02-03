import { Copy, Image, RefreshCw, Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GreetingCardProps {
  greeting: string;
  imageUrl?: string;
  isGeneratingImage: boolean;
  onCopy: () => void;
  onGenerateImage: () => void;
  onRegenerate: () => void;
  onDownloadImage: () => void;
}

export const GreetingCard = ({
  greeting,
  imageUrl,
  isGeneratingImage,
  onCopy,
  onGenerateImage,
  onRegenerate,
  onDownloadImage,
}: GreetingCardProps) => {
  return (
    <div className="w-full animate-fade-in-up">
      {/* 贺词卡片 */}
      <div className="relative bg-gradient-to-br from-card via-card to-primary/20 rounded-2xl p-6 border-2 border-secondary/30 shadow-xl">
        {/* 装饰角 */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-secondary/60 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-secondary/60 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-secondary/60 rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-secondary/60 rounded-br-lg" />
        
        {/* 贺词内容 */}
        <div className="py-4 px-2">
          <p className="text-foreground text-lg leading-relaxed text-center font-medium">
            {greeting}
          </p>
        </div>
        
        {/* 落款 */}
        <div className="text-right mt-4">
          <span className="text-secondary text-sm">—— 马年大吉 2026</span>
        </div>
      </div>

      {/* 生成的图片预览 */}
      {imageUrl && (
        <div className="mt-6 animate-fade-in-up">
          <div className="relative rounded-2xl overflow-hidden border-2 border-secondary/30 shadow-xl">
            <img 
              src={imageUrl} 
              alt="马年贺卡" 
              className="w-full h-auto"
              crossOrigin="anonymous"
            />
            {/* 贺词叠加在图片上 */}
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-black/20">
              <p className="text-white text-lg font-bold text-center drop-shadow-lg leading-relaxed">
                {greeting}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex flex-col gap-3 mt-6">
        <Button
          onClick={onCopy}
          className="w-full bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:opacity-90 h-12 text-base font-semibold animate-pulse-gold"
        >
          <Copy className="w-5 h-5 mr-2" />
          复制贺词
        </Button>
        
        <div className="flex gap-3">
          {!imageUrl ? (
            <Button
              onClick={onGenerateImage}
              disabled={isGeneratingImage}
              variant="outline"
              className={cn(
                "flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20",
                isGeneratingImage && "opacity-70"
              )}
            >
              {isGeneratingImage ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Image className="w-5 h-5 mr-2" />
                  生成贺卡
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={onDownloadImage}
              variant="outline"
              className="flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20"
            >
              <Download className="w-5 h-5 mr-2" />
              下载贺卡
            </Button>
          )}
          
          <Button
            onClick={onRegenerate}
            variant="outline"
            className="flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            重新生成
          </Button>
        </div>
      </div>
    </div>
  );
};
