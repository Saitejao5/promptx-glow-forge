
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, History, Save, Blocks, BarChart3, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingToolbarProps {
  activeTools: {
    history: boolean;
    saved: boolean;
    blocks: boolean;
    analyzer: boolean;
  };
  onToggleTool: (tool: keyof FloatingToolbarProps["activeTools"]) => void;
}

const FloatingToolbar = ({ activeTools, onToggleTool }: FloatingToolbarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tools = [
    { key: "history" as const, icon: History, label: "History", active: activeTools.history },
    { key: "saved" as const, icon: Save, label: "Saved", active: activeTools.saved },
    { key: "blocks" as const, icon: Blocks, label: "Blocks", active: activeTools.blocks },
    { key: "analyzer" as const, icon: BarChart3, label: "Analyzer", active: activeTools.analyzer },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Expanded Tools Panel */}
      {isExpanded && (
        <div className="mb-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 animate-scale-in">
          <div className="grid grid-cols-2 gap-2">
            {tools.map((tool, index) => (
              <Button
                key={tool.key}
                variant="ghost"
                size="sm"
                onClick={() => onToggleTool(tool.key)}
                className={cn(
                  "relative p-3 rounded-xl transition-all duration-300 hover:scale-105",
                  tool.active
                    ? "bg-gradient-to-r from-purple-600/30 to-cyan-600/30 text-white border border-purple-500/50 shadow-lg"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center space-y-1">
                  <tool.icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{tool.label}</span>
                </div>
                {tool.active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-sm"></div>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
          isExpanded
            ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500"
            : "bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500"
        )}
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Settings className="w-6 h-6 text-white animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </Button>
    </div>
  );
};

export default FloatingToolbar;
