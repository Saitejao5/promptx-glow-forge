
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Send, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import ToolSelector from "./ToolSelector";
import VoiceInput from "./VoiceInput";

interface FixedPromptInputProps {
  onSubmit: (prompt: string) => void;
  selectedTool: string | null;
  onToolSelect: (tool: string) => void;
  isLoading: boolean;
}

const FixedPromptInput = ({ 
  onSubmit, 
  selectedTool, 
  onToolSelect, 
  isLoading 
}: FixedPromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
      setPrompt("");
      setShowTools(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceResult = (text: string) => {
    setPrompt(text);
    setIsListening(false);
  };

  return (
    <div className="relative">
      {/* Tool Selector */}
      {showTools && (
        <div className="absolute bottom-full left-4 mb-2">
          <ToolSelector
            selectedTool={selectedTool}
            onToolSelect={(tool) => {
              onToolSelect(tool);
              setShowTools(false);
            }}
          />
        </div>
      )}

      {/* Main Input Container */}
      <div className="p-4 border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3 bg-white/10 border border-white/20 rounded-2xl p-3 focus-within:border-purple-500/50 transition-all duration-300">
            {/* Tools Button */}
            <Button
              onClick={() => setShowTools(!showTools)}
              variant="ghost"
              size="icon"
              className={cn(
                "text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300",
                selectedTool && "text-purple-400 bg-purple-500/20",
                showTools && "bg-white/20"
              )}
            >
              <Settings className="w-5 h-5" />
            </Button>

            {/* Text Input */}
            <Textarea
              ref={textareaRef}
              placeholder="Ask me to enhance your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 min-h-[40px] max-h-[120px] bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 resize-none"
            />

            {/* Voice Input */}
            <VoiceInput
              onResult={handleVoiceResult}
              isListening={isListening}
              onListeningChange={setIsListening}
            />

            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              size="icon"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl disabled:opacity-50 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Selected Tool Indicator */}
          {selectedTool && (
            <div className="mt-2 text-center">
              <span className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">
                {selectedTool === 'ultra' && '⚡ Ultra Enhance'}
                {selectedTool === 'specific' && '✨ Specific Enhance'}
                {selectedTool === 'reverse' && '🔁 Reverse Query'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedPromptInput;
