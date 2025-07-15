
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Mic, MicOff, Settings, Lightbulb, Wrench, RotateCcw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { cn } from "@/lib/utils";

interface FixedPromptInputProps {
  onSubmit: (prompt: string, selectedTool: string | null) => void;
  isProcessing: boolean;
  showThinking: boolean;
  onToggleThinking: (show: boolean) => void;
}

const tools = [
  { id: "ultra", label: "Ultra Enhance", icon: Lightbulb, color: "text-yellow-400" },
  { id: "specific", label: "Specific Enhance", icon: Wrench, color: "text-blue-400" },
  { id: "reverse", label: "Reverse Query", icon: RotateCcw, color: "text-purple-400" },
];

const FixedPromptInput = ({ onSubmit, isProcessing, showThinking, onToggleThinking }: FixedPromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showTools, setShowTools] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);
  const { history } = usePromptHistory();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [prompt]);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSubmit = () => {
    if (!prompt.trim() || isProcessing) return;
    onSubmit(prompt, selectedTool);
    setPrompt("");
    setHistoryIndex(-1);
    setShowTools(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'ArrowUp' && e.ctrlKey) {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setPrompt(history[newIndex].prompt);
      }
    } else if (e.key === 'ArrowDown' && e.ctrlKey) {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setPrompt(history[newIndex].prompt);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setPrompt('');
      }
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const selectedToolData = tools.find(t => t.id === selectedTool);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent backdrop-blur-xl border-t border-white/10">
      <div className="max-w-4xl mx-auto p-4">
        {/* Tools Panel */}
        {showTools && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">Enhancement Tools</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleThinking}
                className={cn(
                  "h-8 px-3 text-xs",
                  showThinking ? "bg-purple-500/20 text-purple-300" : "text-slate-400"
                )}
              >
                {showThinking ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                Show Thinking
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {tools.map((tool) => {
                const Icon = tool.icon;
                const isSelected = selectedTool === tool.id;
                
                return (
                  <motion.button
                    key={tool.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTool(isSelected ? null : tool.id)}
                    className={cn(
                      "relative p-3 rounded-xl transition-all duration-300 group text-left",
                      isSelected
                        ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                    )}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon className={cn("w-4 h-4", tool.color)} />
                      <span className="font-medium text-sm">{tool.label.split(' ')[0]}</span>
                    </div>
                    <p className="text-xs opacity-80">{tool.label}</p>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3">
          {/* History indicator */}
          {historyIndex >= 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-8 left-3"
            >
              <Badge className="bg-purple-500/80 text-white text-xs">
                History {historyIndex + 1}/{history.length}
              </Badge>
            </motion.div>
          )}

          <div className="flex items-end space-x-3">
            {/* Tools Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowTools(!showTools)}
              className={cn(
                "shrink-0 h-10 w-10",
                showTools || selectedTool 
                  ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30" 
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              <Settings className="w-5 h-5" />
              {selectedToolData && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                </div>
              )}
            </Button>

            {/* Textarea */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Type your prompt here... (Ctrl+↑/↓ for history, Enter to send)"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setHistoryIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                className="min-h-[2.5rem] max-h-36 bg-transparent border-0 text-white placeholder:text-slate-400 focus-visible:ring-0 resize-none p-2"
                disabled={isProcessing}
              />
              
              {/* Selected tool indicator */}
              {selectedToolData && (
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-purple-500/20 text-purple-300 text-xs">
                    <selectedToolData.icon className="w-3 h-3 mr-1" />
                    {selectedToolData.label.split(' ')[0]}
                  </Badge>
                </div>
              )}
            </div>

            {/* Voice Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={cn(
                "shrink-0 h-10 w-10",
                isListening 
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" 
                  : "text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              <motion.div
                animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.div>
            </Button>

            {/* Send Button */}
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isProcessing}
              className="shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white disabled:opacity-50"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            </Button>
          </div>

          {/* Voice listening indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -top-12 right-3 bg-red-500/20 border border-red-500/30 rounded-lg px-3 py-2"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 bg-red-400 rounded-full"
                />
                <span className="text-red-300 text-xs font-medium">Listening...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FixedPromptInput;
