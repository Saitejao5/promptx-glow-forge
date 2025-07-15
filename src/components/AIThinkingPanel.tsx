
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronDown, ChevronUp, Sparkles, Target, Users, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIThinkingPanelProps {
  prompt: string;
  isVisible: boolean;
}

const AIThinkingPanel = ({ prompt, isVisible }: AIThinkingPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const metrics = [
    {
      label: "Clarity",
      value: 85,
      color: "from-green-500 to-emerald-500",
      icon: CheckCircle,
      thought: "Restructured for clearer communication"
    },
    {
      label: "Depth", 
      value: 92,
      color: "from-blue-500 to-cyan-500",
      icon: Brain,
      thought: "Added comprehensive context and examples"
    },
    {
      label: "Specificity",
      value: 88,
      color: "from-purple-500 to-violet-500", 
      icon: Target,
      thought: "Included specific deliverables and outcomes"
    },
    {
      label: "Practicality",
      value: 91,
      color: "from-orange-500 to-amber-500",
      icon: Users,
      thought: "Enhanced with actionable implementation steps"
    }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6"
    >
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        variant="outline"
        className="w-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-500/30 text-white hover:bg-purple-500/20 transition-all duration-300"
      >
        <Brain className="w-4 h-4 mr-2" />
        {isExpanded ? "Hide AI Thinking" : "Show AI Thinking"}
        {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
      </Button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mt-4 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20 rounded-lg p-6 relative overflow-hidden"
          >
            {/* Neural background effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/30 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cyan-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                <h3 className="text-lg font-semibold text-white">AI Enhancement Analysis</h3>
              </div>

              <div className="grid gap-4">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <metric.icon className="w-4 h-4 text-purple-300" />
                        <span className="text-white font-medium">{metric.label}</span>
                      </div>
                      <Badge className={cn(
                        "bg-gradient-to-r text-white border-0",
                        metric.color
                      )}>
                        {metric.value}%
                      </Badge>
                    </div>
                    
                    <div className="w-full bg-white/10 rounded-full h-2 mb-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className={cn(
                          "h-2 rounded-full bg-gradient-to-r",
                          metric.color
                        )}
                      />
                    </div>
                    
                    <p className="text-slate-300 text-sm italic">
                      "{metric.thought}"
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg"
              >
                <p className="text-green-300 text-sm font-medium mb-2">Enhancement Summary:</p>
                <p className="text-white text-sm">
                  Transformed basic request into professional-grade prompt with structured framework, 
                  specific deliverables, and actionable implementation guidance.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AIThinkingPanel;
