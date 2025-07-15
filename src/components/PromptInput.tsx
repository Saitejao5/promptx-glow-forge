
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolSelector from "./ToolSelector";
import { usePromptHistory } from "@/hooks/usePromptHistory";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

const PromptInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  isLoading, 
  selectedTool, 
  onToolSelect 
}: PromptInputProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { history } = usePromptHistory();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [value]);

  // Handle arrow key navigation through history
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && e.ctrlKey) {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        onChange(history[newIndex].prompt);
      }
    } else if (e.key === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        onChange(history[newIndex].prompt);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        onChange('');
      }
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative group">
      <div className="relative">
        <Textarea
          ref={textareaRef}
          placeholder="Enter your prompt here... (Ctrl+↑/↓ for history, Ctrl+Enter to submit)"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setHistoryIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-h-16 max-h-48 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 resize-none pr-20",
            isLoading && "opacity-50"
          )}
          disabled={isLoading}
        />
        
        {/* Voice Input Button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-12 top-3 h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
          disabled={isLoading}
        >
          <Mic className="w-4 h-4" />
        </Button>

        {/* Submit Button */}
        <Button
          size="sm"
          onClick={onSubmit}
          disabled={!value.trim() || isLoading}
          className="absolute right-2 top-3 h-8 px-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs disabled:opacity-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowRight className={cn(
            "w-3 h-3 transition-transform duration-300",
            isHovered ? "translate-x-0.5" : ""
          )} />
        </Button>

        {/* Gradient overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Tool Selector */}
      <div className="absolute -bottom-12 left-2">
        <ToolSelector 
          selectedTool={selectedTool}
          onToolSelect={onToolSelect}
        />
      </div>

      {/* History indicator */}
      {historyIndex >= 0 && (
        <div className="absolute -top-8 left-0">
          <div className="bg-purple-500/80 text-white text-xs px-2 py-1 rounded animate-fade-in">
            History {historyIndex + 1}/{history.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptInput;
