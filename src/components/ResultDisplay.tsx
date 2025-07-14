
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Save, RotateCcw, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultDisplayProps {
  isLoading?: boolean;
  result?: string;
  onTryAgain?: () => void;
  onSaveTemplate?: () => void;
}

const ResultDisplay = ({ 
  isLoading = false, 
  result, 
  onTryAgain, 
  onSaveTemplate 
}: ResultDisplayProps) => {
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  // Show the component when result is available or loading
  const shouldShow = isLoading || result;

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast({
        title: "Copied to clipboard",
        description: "Enhanced prompt has been copied successfully",
      });
    }
  };

  const handleSaveTemplate = () => {
    onSaveTemplate?.();
    toast({
      title: "Saved as template",
      description: "Your enhanced prompt has been saved",
    });
  };

  if (!shouldShow) return null;

  return (
    <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <h2 className="text-2xl font-semibold text-white">Enhanced Result</h2>
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-slate-400">Your AI-enhanced prompt is ready</p>
      </div>

      {/* Main Result Card */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden animate-scale-in delay-300">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-50"></div>
        
        <div className="relative p-8">
          {isLoading ? (
            /* Loading State */
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
                <span className="text-purple-300 text-sm ml-2">Enhancing your prompt...</span>
              </div>
              
              {/* Shimmer Loading Lines */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative overflow-hidden">
                    <div 
                      className="h-4 bg-white/10 rounded animate-pulse"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Result Content */
            <div className="space-y-6 animate-fade-in delay-500">
              {/* Enhanced Prompt Output */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-300 font-medium">Enhanced Prompt</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="text-white leading-relaxed text-lg font-light whitespace-pre-wrap">
                    {result || "Your enhanced prompt will appear here..."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <Copy className="w-4 h-4 mr-2 group-hover:text-purple-300 transition-colors" />
                  Copy
                </Button>
                
                <Button
                  onClick={handleSaveTemplate}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <Save className="w-4 h-4 mr-2 group-hover:text-cyan-300 transition-colors" />
                  Save as Template
                </Button>
                
                <Button
                  onClick={onTryAgain}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <RotateCcw className="w-4 h-4 mr-2 group-hover:text-orange-300 transition-colors" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Bottom Stats/Info */}
      {result && !isLoading && (
        <div className="text-center mt-6 animate-fade-in delay-700">
          <p className="text-slate-500 text-sm">
            Enhanced in 2.3s • {result.length} characters • Premium quality
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
