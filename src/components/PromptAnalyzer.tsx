
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap, BarChart3 } from "lucide-react";

interface AnalyzerMetric {
  label: string;
  emoji: string;
  score: number;
  description: string;
}

interface PromptAnalyzerProps {
  prompt: string;
  onImprove: (metric: string) => void;
}

const PromptAnalyzer = ({ prompt, onImprove }: PromptAnalyzerProps) => {
  const [metrics, setMetrics] = useState<AnalyzerMetric[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzePrompt = (text: string): AnalyzerMetric[] => {
    // Simple analysis based on prompt characteristics
    const wordCount = text.split(' ').length;
    const hasQuestion = text.includes('?');
    const hasContext = text.toLowerCase().includes('context') || text.toLowerCase().includes('background');
    const hasSpecifics = /\b(specific|detailed|exactly|precisely)\b/i.test(text);
    const hasAction = /\b(write|create|generate|develop|build|design)\b/i.test(text);

    return [
      {
        label: "Clarity",
        emoji: "✅",
        score: Math.min(100, (wordCount > 5 ? 70 : 40) + (hasQuestion ? 20 : 0) + (hasAction ? 10 : 0)),
        description: hasAction ? "Good action words present" : "Consider adding clearer action words"
      },
      {
        label: "Depth",
        emoji: "🧠",
        score: Math.min(100, (wordCount > 15 ? 60 : 30) + (hasContext ? 30 : 0) + (text.length > 100 ? 10 : 0)),
        description: hasContext ? "Good contextual information" : "Add more context for better results"
      },
      {
        label: "Specificity",
        emoji: "🔍",
        score: Math.min(100, (hasSpecifics ? 70 : 40) + (wordCount > 20 ? 20 : 0) + (text.includes('format') ? 10 : 0)),
        description: hasSpecifics ? "Good level of detail" : "Be more specific about requirements"
      },
      {
        label: "Practicality",
        emoji: "⚙",
        score: Math.min(100, (hasAction ? 60 : 30) + (text.includes('example') ? 20 : 0) + (wordCount < 200 ? 20 : 0)),
        description: text.includes('example') ? "Good use of examples" : "Consider adding examples"
      }
    ];
  };

  useEffect(() => {
    if (prompt.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis delay
      setTimeout(() => {
        setMetrics(analyzePrompt(prompt));
        setIsAnalyzing(false);
      }, 800);
    }
  }, [prompt]);

  if (!prompt.trim()) {
    return null;
  }

  const averageScore = metrics.reduce((sum, metric) => sum + metric.score, 0) / metrics.length;

  return (
    <Card className="bg-white/5 backdrop-blur-xl border-white/10 mt-6 animate-fade-in">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Prompt Analysis</h3>
          <div className="flex-1"></div>
          <div className="text-sm text-slate-400">
            Overall Score: <span className="text-white font-medium">{Math.round(averageScore)}%</span>
          </div>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-white/10 rounded animate-pulse"></div>
                <div className="h-2 bg-white/5 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{metric.emoji}</span>
                    <span className="font-medium text-white">{metric.label}</span>
                  </div>
                  <span className="text-sm text-slate-300">{metric.score}%</span>
                </div>
                
                <Progress 
                  value={metric.score} 
                  className="h-2 mb-3"
                />
                
                <p className="text-xs text-slate-400 mb-3">{metric.description}</p>
                
                {metric.score < 70 && (
                  <Button
                    size="sm"
                    onClick={() => onImprove(metric.label)}
                    className="w-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 hover:from-purple-600/30 hover:to-cyan-600/30 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Improve {metric.label}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default PromptAnalyzer;
