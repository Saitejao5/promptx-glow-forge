
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Lightbulb, Bot, FileText, Sparkles, ChevronUp } from "lucide-react";
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
    label: "Specific Enhance", 
    description: "Target specific improvements",
    color: "text-blue-400"
  },
  { 
    id: "ultra", 
    icon: Lightbulb, 
    label: "Ultra Enhance", 
    description: "Maximum enhancement power",
    color: "text-yellow-400"
  },
  { 
    id: "reverse", 
    icon: Bot, 
    label: "Reverse Query", 
    description: "Generate from outcomes",
    color: "text-purple-400"
  },
  { 
    id: "templates", 
    icon: FileText, 
    label: "Use Template", 
    description: "Pre-built templates",
    color: "text-cyan-400"
  },
];

const ToolSelector = ({ selectedTool, onToolSelect }: ToolSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedToolData = tools.find(t => t.id === selectedTool);

  return (
    <div className="relative">
      {/* Tool Panel */}
      {isExpanded && (
        <div className="absolute bottom-12 left-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 min-w-80 animate-scale-in">
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              
              return (
                <Button
                  key={tool.id}
                  variant="ghost"
                  onClick={() => {
                    onToolSelect(tool.id);
                    setIsExpanded(false);
                  }}
                  className={cn(
                    "relative p-4 rounded-xl transition-all duration-300 hover:scale-105 group",
                    isSelected
                      ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50 shadow-lg"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                  )}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Icon className={cn("w-6 h-6", tool.color)} />
                    <span className="text-xs font-medium text-center">{tool.label}</span>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm animate-pulse"></div>
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="ghost"
        className="relative bg-white/5 hover:bg-white/10 border border-white/10 rounded-full p-3 transition-all duration-300 hover:scale-110"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <ChevronUp className={cn(
            "w-4 h-4 text-slate-400 transition-transform duration-300",
            isExpanded ? "rotate-180" : ""
          )} />
        </div>
        {selectedToolData && (
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-purple-500/80 text-white text-xs px-2 py-1 animate-pulse">
              <selectedToolData.icon className="w-3 h-3 mr-1" />
              {selectedToolData.label.split(' ')[0]}
            </Badge>
          </div>
        )}
      </Button>
    </div>
  );
};

export default ToolSelector;
