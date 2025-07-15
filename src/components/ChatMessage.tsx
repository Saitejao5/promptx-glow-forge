
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Save, RotateCcw, Share2, Edit, User, Bot, Sparkles, TrendingUp, Diff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import PromptAnalyzer from "./PromptAnalyzer";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  originalPrompt?: string;
  timestamp: number;
  isLoading?: boolean;
  selectedTool?: string | null;
}

interface ChatMessageProps {
  message: Message;
  onSave?: (originalPrompt: string, enhancedPrompt: string) => void;
  onTryAgain?: () => void;
}

const grades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
const getRandomGrade = () => grades[Math.floor(Math.random() * 3)];

const ChatMessage = ({ message, onSave, onTryAgain }: ChatMessageProps) => {
  const [showDiff, setShowDiff] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [grade] = useState(getRandomGrade());
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied successfully",
    });
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/share/${btoa(message.content)}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Share link copied",
      description: "Anyone with this link can view your prompt",
    });
  };

  const handleSave = () => {
    if (message.originalPrompt && onSave) {
      onSave(message.originalPrompt, message.content);
    }
  };

  if (message.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="flex items-start space-x-3 max-w-3xl">
          <div className="flex-1 text-right">
            <Card className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-purple-500/30 p-4 rounded-2xl rounded-br-md">
              <p className="text-white leading-relaxed">{message.content}</p>
              {message.selectedTool && (
                <Badge className="mt-2 bg-purple-500/20 text-purple-300">
                  Enhanced with {message.selectedTool}
                </Badge>
              )}
            </Card>
          </div>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3 max-w-full w-full">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
            {message.isLoading ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
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
                  <span className="text-purple-300 text-sm">Enhancing your prompt...</span>
                </div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
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
              <div className="p-6 space-y-4">
                {/* Header with Grade and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className={cn(
                      "text-sm px-3 py-1 font-bold",
                      grade.includes('A') ? "bg-green-500/20 text-green-300 border-green-500/30" :
                      grade.includes('B') ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                      "bg-orange-500/20 text-orange-300 border-orange-500/30"
                    )}>
                      Grade: {grade}
                    </Badge>
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
                {showDiff && message.originalPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid md:grid-cols-2 gap-4 p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div>
                      <p className="text-sm text-red-300 mb-2">Original:</p>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-white">
                        {message.originalPrompt}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-green-300 mb-2">Enhanced:</p>
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-white max-h-40 overflow-y-auto">
                        {message.content}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Main Content */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-purple-300 font-medium">Enhanced Prompt</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  </div>
                  <div className="text-white leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <p className="text-sm text-cyan-300 mb-1">Summary:</p>
                  <p className="text-white text-sm">
                    Professional prompt optimized for clarity, context, and actionable outcomes. 
                    Enhanced with structured formatting and expert-level detail.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <Button
                    onClick={handleCopy}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  
                  <Button
                    onClick={handleSave}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/30"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-blue-500/30"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={onTryAgain}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-orange-500/30"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>

                  <Button
                    onClick={() => setShowAnalysis(!showAnalysis)}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-yellow-500/30"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {showAnalysis ? 'Hide' : 'Show'} Analysis
                  </Button>
                </div>

                {/* Analysis Panel */}
                {showAnalysis && message.originalPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <PromptAnalyzer 
                      prompt={message.originalPrompt}
                      onImprove={() => {}}
                    />
                  </motion.div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
