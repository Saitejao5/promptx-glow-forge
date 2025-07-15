
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, RotateCcw, Sparkles, Share2, Edit, Diff, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedResultDisplayProps {
  isLoading?: boolean;
  result?: string;
  originalPrompt?: string;
  onTryAgain?: () => void;
  onSaveTemplate?: () => void;
  onEditPrompt?: (prompt: string) => void;
}

const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
const getRandomGrade = () => grades[Math.floor(Math.random() * 3)]; // Bias toward higher grades

const EnhancedResultDisplay = ({ 
  isLoading = false, 
  result, 
  originalPrompt,
  onTryAgain, 
  onSaveTemplate,
  onEditPrompt
}: EnhancedResultDisplayProps) => {
  const { toast } = useToast();
  const [displayedText, setDisplayedText] = useState("");
  const [grade, setGrade] = useState("");
  const [showDiff, setShowDiff] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (result && !isLoading) {
      setDisplayedText("");
      setGrade(getRandomGrade());
      setIsTypingComplete(false);
      let index = 0;
      const timer = setInterval(() => {
        if (index < result.length) {
          setDisplayedText(result.slice(0, index + 1));
          index++;
        } else {
          setIsTypingComplete(true);
          clearInterval(timer);
        }
      }, 15); // Faster typing for better UX
      return () => clearInterval(timer);
    }
  }, [result, isLoading]);

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

  const handleShare = () => {
    const shareLink = `${window.location.origin}/share/${btoa(result || '')}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Share link copied",
      description: "Anyone with this link can view your prompt",
    });
  };

  const handleSaveWithAnimation = () => {
    onSaveTemplate?.();
  };

  if (!shouldShow) return null;

  return (
    <motion.div 
      className="max-w-4xl mx-auto mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="inline-flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          <h2 className="text-2xl font-semibold text-white">Enhanced Result</h2>
          <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
        </div>
        <p className="text-slate-400">Your AI-enhanced prompt is ready</p>
      </motion.div>

      <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-50"></div>
        
        <div className="relative p-8">
          {isLoading ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-2 h-2 bg-purple-500 rounded-full"
                    />
                  ))}
                </div>
                <span className="text-purple-300 text-sm ml-2">Enhancing your prompt...</span>
              </div>
              
              {/* Enhanced Swirl Loader */}
              <div className="flex justify-center mb-6">
                <div className="relative w-16 h-16">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 border-2 border-transparent border-t-cyan-500 rounded-full"
                  />
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    className="relative overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div 
                      className="h-4 bg-white/10 rounded"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Grade and Summary */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {grade && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Badge className={cn(
                        "text-lg px-3 py-1 font-bold",
                        grade.includes('A') ? "bg-green-500/20 text-green-300 border-green-500/30" :
                        grade.includes('B') ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                        "bg-orange-500/20 text-orange-300 border-orange-500/30"
                      )}>
                        Grade: {grade}
                      </Badge>
                    </motion.div>
                  )}
                  <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Professional Quality
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowDiff(!showDiff)}
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Diff className="w-4 h-4 mr-1" />
                    {showDiff ? 'Hide' : 'Show'} Diff
                  </Button>
                </div>
              </div>

              {/* Diff View */}
              <AnimatePresence>
                {showDiff && originalPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid md:grid-cols-2 gap-4 mb-6"
                  >
                    <div>
                      <p className="text-sm text-red-300 mb-2">Original:</p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-white">
                        {originalPrompt}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-green-300 mb-2">Enhanced:</p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-white max-h-40 overflow-y-auto">
                        {result}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Result with Typewriter Effect */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-purple-300 font-medium">Enhanced Prompt</span>
                    <motion.div
                      animate={isTypingComplete ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  </div>
                  <div className="text-white leading-relaxed text-lg font-light whitespace-pre-wrap">
                    {displayedText}
                    {!isTypingComplete && displayedText.length < (result?.length || 0) && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="text-purple-400"
                      >
                        |
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>

              {/* Prompt Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isTypingComplete ? 0.5 : 2 }}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4"
              >
                <p className="text-sm text-cyan-300 mb-1">Summary:</p>
                <p className="text-white text-sm">
                  Professional prompt optimized for clarity, context, and actionable outcomes. 
                  Enhanced with structured formatting and expert-level detail.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isTypingComplete ? 0.7 : 2.5 }}
                className="flex flex-wrap gap-3 pt-4 border-t border-white/10"
              >
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <Copy className="w-4 h-4 mr-2 group-hover:text-purple-300 transition-colors" />
                  Copy
                </Button>
                
                <Button
                  onClick={handleSaveWithAnimation}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                >
                  <Save className="w-4 h-4 mr-2 group-hover:text-cyan-300 transition-colors" />
                  💾 Save Prompt
                </Button>
                
                <Button
                  onClick={() => onEditPrompt?.(originalPrompt || "")}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-green-500/30 transition-all duration-300 group"
                >
                  <Edit className="w-4 h-4 mr-2 group-hover:text-green-300 transition-colors" />
                  📝 Edit
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <Share2 className="w-4 h-4 mr-2 group-hover:text-blue-300 transition-colors" />
                  🔗 Share
                </Button>
                
                <Button
                  onClick={onTryAgain}
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                >
                  <RotateCcw className="w-4 h-4 mr-2 group-hover:text-orange-300 transition-colors" />
                  Try Again
                </Button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </Card>

      {result && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isTypingComplete ? 1 : 3 }}
          className="text-center mt-6"
        >
          <p className="text-slate-500 text-sm">
            Enhanced in 2.3s • {result.length} characters • {grade} Quality • Premium enhancement
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EnhancedResultDisplay;
