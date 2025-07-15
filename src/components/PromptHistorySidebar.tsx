
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Copy, Edit, RotateCcw, X, ChevronLeft } from "lucide-react";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PromptHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onReusePrompt: (prompt: string) => void;
  onEditPrompt: (prompt: string) => void;
}

const PromptHistorySidebar = ({ 
  isOpen, 
  onClose, 
  onReusePrompt, 
  onEditPrompt 
}: PromptHistorySidebarProps) => {
  const { history, removeFromHistory } = usePromptHistory();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Prompt copied to clipboard",
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-96 bg-slate-950/90 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Prompt History</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {history.length === 0 ? (
              <div className="text-center text-slate-400 mt-20">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No history yet</p>
              </div>
            ) : (
              history.map((item, index) => (
                <Card
                  key={item.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-4 hover:bg-white/10 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-3">
                    {/* Timestamp */}
                    <p className="text-xs text-slate-400">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>

                    {/* Original Prompt */}
                    <div>
                      <p className="text-xs text-slate-300 mb-1">Original:</p>
                      <p className="text-sm text-white line-clamp-3 bg-white/5 p-2 rounded">
                        {item.prompt}
                      </p>
                    </div>

                    {/* Enhanced Prompt */}
                    {item.enhanced && (
                      <div>
                        <p className="text-xs text-slate-300 mb-1">Enhanced:</p>
                        <p className="text-sm text-white line-clamp-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-2 rounded border border-purple-500/20">
                          {item.enhanced}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditPrompt(item.prompt)}
                        className="h-7 px-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(item.enhanced || item.prompt)}
                        className="h-7 px-2 bg-green-500/20 text-green-300 hover:bg-green-500/30"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onReusePrompt(item.prompt)}
                        className="h-7 px-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                      >
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reuse
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptHistorySidebar;
