
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolsPanelProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
  onClose: () => void;
}

const ToolsPanel = ({ selectedTool, onToolSelect, onClose }: ToolsPanelProps) => {
  const tools = [
    {
      id: "specific",
      icon: Sparkles,
      label: "Specific Enhance",
      emoji: "✨",
      description: "Target specific improvements",
      color: "text-blue-400"
    },
    {
      id: "ultra",
      icon: Zap,
      label: "Ultra Enhance",
      emoji: "⚡",
      description: "Maximum enhancement power",
      color: "text-yellow-400"
    },
    {
      id: "reverse",
      icon: RotateCcw,
      label: "Reverse Query",
      emoji: "🔁",
      description: "Generate from outcomes",
      color: "text-purple-400"
    }
  ];

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-4 min-w-72 animate-scale-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Enhancement Tools</h3>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 h-6 w-6 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <Button
              key={tool.id}
              onClick={() => {
                onToolSelect(tool.id);
                onClose();
              }}
              variant="ghost"
              className={cn(
                "w-full justify-start p-3 h-auto transition-all duration-300 hover:scale-[1.02]",
                isSelected
                  ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50 shadow-lg"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              <div className="flex items-center space-x-3 w-full">
                <span className="text-2xl">{tool.emoji}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{tool.label}</div>
                  <div className="text-xs text-slate-400">{tool.description}</div>
                </div>
                <Icon className={cn("w-5 h-5", tool.color)} />
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg blur-sm animate-pulse pointer-events-none"></div>
              )}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default ToolsPanel;
