
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, Share2, Edit, Diff, TrendingUp, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import AIThinkingPanel from "./AIThinkingPanel";

interface ChatEntry {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  tool: string;
  grade: string;
  timestamp: Date;
}

interface ChatMessageProps {
  chatEntry: ChatEntry;
  isLoading?: boolean;
  onSave: () => void;
}

const ChatMessage = ({ chatEntry, isLoading, onSave }: ChatMessageProps) => {
  const { toast } = useToast();
  const [showDiff, setShowDiff] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  const handleCopy = async () => {
    if (chatEntry.enhancedPrompt) {
      await navigator.clipboard.writeText(chatEntry.enhancedPrompt);
      toast({
        title: "Copied to clipboard",
        description: "Enhanced prompt has been copied successfully",
      });
    }
  };

  const handleShare = () => {
    const shareLink = `${window.location.origin}/share/${btoa(chatEntry.enhancedPrompt || '')}`;
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Share link copied",
      description: "Anyone with this link can view your prompt",
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* User Message */}
      <div className="flex justify-end">
        <Card className="bg-purple-600/20 border-purple-500/30 max-w-3xl p-4">
          <p className="text-white">{chatEntry.originalPrompt}</p>
        </Card>
      </div>

      {/* AI Response */}
      <div className="flex justify-start">
        <div className="max-w-4xl w-full space-y-4">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-50"></div>
            
            <div className="relative p-6">
              {isLoading ? (
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
                    </div>
                    <span className="text-purple-300 text-sm ml-2">Enhancing your prompt...</span>
                  </div>
                  
                  {/* AI Swirl Loader */}
                  <div className="flex justify-center mb-6">
                    <div className="relative w-16 h-16">
                      <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-2 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                      <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    </div>
                  </div>
                  
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
                <div className="space-y-6 animate-fade-in delay-500">
                  {/* Grade and Summary */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {chatEntry.grade && (
                        <Badge className={cn(
                          "text-lg px-3 py-1 font-bold animate-scale-in",
                          chatEntry.grade.includes('A') ? "bg-green-500/20 text-green-300 border-green-500/30" :
                          chatEntry.grade.includes('B') ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                          "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        )}>
                          Grade: {chatEntry.grade}
                        </Badge>
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
                  {showDiff && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6 animate-scale-in">
                      <div>
                        <p className="text-sm text-red-300 mb-2">Original:</p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-white">
                          {chatEntry.originalPrompt}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-green-300 mb-2">Enhanced:</p>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-white max-h-40 overflow-y-auto">
                          {chatEntry.enhancedPrompt}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Main Result */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-purple-300 font-medium">Enhanced Prompt</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-white leading-relaxed text-lg font-light whitespace-pre-wrap">
                        {chatEntry.enhancedPrompt}
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
                      onClick={onSave}
                      variant="outline"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                    >
                      <Save className="w-4 h-4 mr-2 group-hover:text-cyan-300 transition-colors" />
                      💾 Save
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
                      onClick={() => setShowThinking(!showThinking)}
                      variant="outline"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 group"
                    >
                      <Eye className="w-4 h-4 mr-2 group-hover:text-orange-300 transition-colors" />
                      🔍 {showThinking ? 'Hide' : 'Show'} AI Thinking
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* AI Thinking Panel */}
          {showThinking && chatEntry.enhancedPrompt && (
            <AIThinkingPanel tool={chatEntry.tool} />
          )}

          {/* Summary */}
          {chatEntry.enhancedPrompt && !isLoading && (
            <div className="text-center animate-fade-in delay-700">
              <p className="text-slate-500 text-sm">
                Enhanced in 2.3s • {chatEntry.enhancedPrompt.length} characters • {chatEntry.grade} Quality • Premium enhancement
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
