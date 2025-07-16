
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Save, Edit, Share2, Diff, Brain, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  originalPrompt?: string;
  grade?: string;
  summary?: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSavePrompt: (message: ChatMessage) => void;
  onShowThinking: (messageId: string | null) => void;
  showThinking: string | null;
}

const ChatMessages = ({ 
  messages, 
  isLoading, 
  onSavePrompt,
  onShowThinking,
  showThinking
}: ChatMessagesProps) => {
  const [showDiff, setShowDiff] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleShare = (text: string) => {
    const shareLink = `${window.location.origin}/share/${btoa(text)}`;
    navigator.clipboard.writeText(shareLink);
  };

  const LoadingMessage = () => (
    <div className="flex justify-start mb-6">
      <Card className="max-w-4xl bg-white/5 backdrop-blur-xl border-white/10 p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-200"></div>
            </div>
            <span className="text-purple-300 text-sm">Enhancing your prompt...</span>
          </div>
          
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-t-cyan-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
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
      </Card>
    </div>
  );

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <div className="relative">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Welcome to PromptX
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          </div>
          <p className="text-xl text-slate-300 leading-relaxed">
            Transform your prompts into professional-grade commands with AI enhancement
          </p>
          <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300 px-4 py-2">
            Start typing below to begin
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {messages.map((message) => (
          <div key={message.id} className={cn(
            "flex",
            message.type === 'user' ? "justify-end" : "justify-start"
          )}>
            <Card className={cn(
              "max-w-4xl backdrop-blur-xl border-white/10 p-6 animate-fade-in",
              message.type === 'user' 
                ? "bg-purple-500/10 border-purple-500/20" 
                : "bg-white/5"
            )}>
              {message.type === 'user' ? (
                <div className="text-white leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Grade and Summary */}
                  {message.grade && (
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className={cn(
                          "text-lg px-3 py-1 font-bold animate-scale-in",
                          message.grade.includes('A') ? "bg-green-500/20 text-green-300 border-green-500/30" :
                          message.grade.includes('B') ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" :
                          "bg-orange-500/20 text-orange-300 border-orange-500/30"
                        )}>
                          Grade: {message.grade}
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
                          onClick={() => setShowDiff(showDiff === message.id ? null : message.id)}
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                          <Diff className="w-4 h-4 mr-1" />
                          {showDiff === message.id ? 'Hide' : 'Show'} Diff
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Diff View */}
                  {showDiff === message.id && message.originalPrompt && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6 animate-fade-in">
                      <div>
                        <p className="text-sm text-red-300 mb-2">Original:</p>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-white">
                          {message.originalPrompt}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-green-300 mb-2">Enhanced:</p>
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-sm text-white">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Content */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-6 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-purple-300 font-medium">Enhanced Prompt</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-white leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>

                  {/* Summary */}
                  {message.summary && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <p className="text-sm text-cyan-300 mb-1">Summary:</p>
                      <p className="text-white text-sm">{message.summary}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    <Button
                      onClick={() => handleCopy(message.content)}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    
                    <Button
                      onClick={() => onSavePrompt(message)}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-cyan-500/30"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    
                    <Button
                      onClick={() => handleShare(message.content)}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-blue-500/30"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>

                    <Button
                      onClick={() => onShowThinking(message.id)}
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      🔍 Show AI Thinking
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        ))}
        
        {isLoading && <LoadingMessage />}
      </div>
    </div>
  );
};

export default ChatMessages;
