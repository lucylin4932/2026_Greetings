import { Copy, Image, RefreshCw, Loader2, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface GreetingCardProps {
  greeting: string;
  imageUrl?: string;
  isGeneratingImage: boolean;
  onCopy: () => void;
  onGenerateImage: () => void;
  onRegenerate: () => void;
  onDownloadImage: () => void;
  onBackHome?: () => void;
}

export const GreetingCard = ({
  greeting,
  imageUrl,
  isGeneratingImage,
  onCopy,
  onGenerateImage,
  onRegenerate,
  onDownloadImage,
  onBackHome,
}: GreetingCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!imageUrl || !cardRef.current) {
      onDownloadImage();
      return;
    }

    try {
      // 创建canvas来合成图片和文字
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 加载图片
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // 设置canvas尺寸为图片尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      // 添加半透明黑色背景以突出文字
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 设置文字样式
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 添加文字阴影
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // 绘制贺词文字（分行）
      const maxWidth = canvas.width - 100;
      const lineHeight = 50;
      const words = greeting.split('，');
      const lines: string[] = [];
      
      words.forEach(word => {
        if (word) {
          lines.push(word);
        }
      });

      const startY = canvas.height / 2 - (lines.length * lineHeight) / 2;
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
      });

      // 添加落款
      ctx.font = '28px sans-serif';
      ctx.fillText('—— 马年大吉 2026', canvas.width / 2, canvas.height - 60);

      // 下载图片
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = '马年贺卡_2026.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('下载失败:', error);
      // 如果canvas方法失败，回退到原始方法
      onDownloadImage();
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      {/* 贺词卡片 - 只在没有图片时显示 */}
      {!imageUrl && (
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
      )}

      {/* 生成的图片预览 */}
      {imageUrl && (
        <div className="mt-0 animate-fade-in-up" ref={cardRef}>
          <div className="relative rounded-2xl overflow-hidden border-2 border-secondary/30 shadow-xl">
            <img 
              src={imageUrl} 
              alt="马年贺卡" 
              className="w-full h-auto"
              crossOrigin="anonymous"
            />
            {/* 贺词叠加在图片上 */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/20">
              <p className="text-white text-lg font-bold text-center drop-shadow-lg leading-relaxed">
                {greeting}
              </p>
              <p className="text-white/90 text-sm mt-8 drop-shadow-lg">
                —— 马年大吉 2026
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
            <>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20"
              >
                <Download className="w-5 h-5 mr-2" />
                下载贺卡
              </Button>
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
                    <RefreshCw className="w-5 h-5 mr-2" />
                    重新生成图片
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onRegenerate}
            variant="outline"
            className="flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            重新生成贺词
          </Button>
          
          {onBackHome && (
            <Button
              onClick={onBackHome}
              variant="outline"
              className="flex-1 h-12 text-base border-secondary/50 text-foreground hover:bg-secondary/20"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
