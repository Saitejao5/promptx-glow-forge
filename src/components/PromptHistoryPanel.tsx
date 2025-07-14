
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, RotateCcw, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { formatDistanceToNow } from "date-fns";

interface PromptHistoryPanelProps {
  onReusePrompt: (prompt: string) => void;
}

const PromptHistoryPanel = ({ onReusePrompt }: PromptHistoryPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { history, clearHistory, removeFromHistory } = usePromptHistory();

  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 mt-6 animate-fade-in">
      <div className="p-4">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between text-white hover:bg-white/5 p-3"
        >
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-purple-400" />
            <span className="font-medium">Recent Prompts ({history.length})</span>
          </div>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>

        {isExpanded && (
          <div className="mt-4 space-y-3 animate-fade-in">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Clear All
              </Button>
            </div>
            
            {history.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/5 border border-white/10 rounded-lg p-3 group hover:bg-white/10 transition-all duration-300 hover:scale-[1.01] animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate pr-2">
                      {item.prompt}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onReusePrompt(item.prompt)}
                      className="h-7 px-2 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reuse
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromHistory(item.id)}
                      className="h-7 px-2 text-red-400 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PromptHistoryPanel;
