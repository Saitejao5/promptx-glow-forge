
import { Button } from "@/components/ui/button";
import { Wrench, Lightbulb, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  icon: any;
  label: string;
  description: string;
  color: string;
}

interface ToolSelectorProps {
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

const tools: Tool[] = [
  { 
    id: "specific", 
    icon: Wrench, 
    label: "✨ Specific Enhance", 
    description: "Target specific improvements",
    color: "text-blue-400"
  },
  { 
    id: "ultra", 
    icon: Lightbulb, 
    label: "⚡ Ultra Enhance", 
    description: "Maximum enhancement power",
    color: "text-yellow-400"
  },
  { 
    id: "reverse", 
    icon: Bot, 
    label: "🔁 Reverse Query", 
    description: "Generate from outcomes",
    color: "text-purple-400"
  },
];

const ToolSelector = ({ selectedTool, onToolSelect }: ToolSelectorProps) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-60 animate-scale-in">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-purple-300 mb-3">🎛 Enhancement Tools</h3>
        
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <Button
              key={tool.id}
              variant="ghost"
              onClick={() => onToolSelect(tool.id)}
              className={cn(
                "w-full p-4 rounded-xl transition-all duration-300 hover:scale-105 group text-left justify-start",
                isSelected
                  ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50 shadow-lg"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              <div className="flex items-center space-x-3">
                <Icon className={cn("w-5 h-5", tool.color)} />
                <div>
                  <div className="font-medium">{tool.label}</div>
                  <div className="text-xs text-slate-400 group-hover:text-slate-300">
                    {tool.description}
                  </div>
                </div>
              </div>
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm animate-pulse -z-10"></div>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolSelector;
