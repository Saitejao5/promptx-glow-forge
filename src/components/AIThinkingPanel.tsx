
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";

interface AIThinkingPanelProps {
  tool: string;
}

const AIThinkingPanel = ({ tool }: AIThinkingPanelProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  const getThinkingSteps = (tool: string) => {
    switch (tool) {
      case "ultra":
        return [
          "🔍 Analyzing prompt scope and complexity...",
          "🎯 Identifying key objectives and success criteria...",
          "🧠 Applying expert-level domain knowledge...",
          "📊 Structuring comprehensive framework...",
          "⚡ Enhancing with strategic depth and actionable insights...",
          "✨ Finalizing professional-grade output..."
        ];
      case "specific":
        return [
          "🔍 Breaking down specific requirements...",
          "🎯 Focusing on targeted improvements...",
          "🧠 Applying specialized expertise...",
          "📋 Creating step-by-step guidance...",
          "⚡ Adding practical examples and templates...",
          "✨ Delivering focused, actionable results..."
        ];
      case "reverse":
        return [
          "🔍 Identifying desired end outcome...",
          "🎯 Mapping backwards from goal state...",
          "🧠 Analyzing critical path dependencies...",
          "📊 Creating reverse-engineered roadmap...",
          "⚡ Establishing checkpoints and milestones...",
          "✨ Structuring implementation strategy..."
        ];
      default:
        return [
          "🔍 Processing your prompt...",
          "🧠 Applying AI enhancement...",
          "⚡ Optimizing for clarity and impact...",
          "✨ Finalizing enhanced output..."
        ];
    }
  };

  const steps = getThinkingSteps(tool);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + 1;
        if (next < steps.length) {
          setVisibleSteps(prev => [...prev, next]);
          return next;
        }
        clearInterval(timer);
        return prev;
      });
    }, 800);

    // Show first step immediately
    setVisibleSteps([0]);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <Card className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20 p-6 animate-scale-in">
      <div className="flex items-center space-x-3 mb-4">
        <Brain className="w-6 h-6 text-cyan-400 animate-pulse" />
        <h3 className="text-lg font-semibold text-white">AI Thinking Process</h3>
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
      </div>
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 transition-all duration-500 ${
              visibleSteps.includes(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-4'
            }`}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentStep
                ? 'bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse'
                : 'bg-white/20'
            }`} />
            <p className={`text-sm transition-colors duration-300 ${
              index <= currentStep ? 'text-white' : 'text-slate-400'
            }`}>
              {step}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-cyan-500/20">
        <p className="text-xs text-cyan-300">
          Enhanced with {tool === "ultra" ? "Ultra" : tool === "specific" ? "Specific" : "Reverse"} AI processing
        </p>
      </div>
    </Card>
  );
};

export default AIThinkingPanel;
