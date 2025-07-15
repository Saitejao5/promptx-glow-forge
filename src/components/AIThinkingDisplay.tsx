
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Lightbulb, Target, Zap } from "lucide-react";

interface AIThinkingDisplayProps {
  prompt: string;
}

const thinkingSteps = [
  {
    icon: Brain,
    title: "Analyzing prompt structure",
    description: "Examining clarity, specificity, and context",
    color: "text-purple-400"
  },
  {
    icon: Target,
    title: "Identifying enhancement opportunities", 
    description: "Finding areas for improvement and optimization",
    color: "text-cyan-400"
  },
  {
    icon: Lightbulb,
    title: "Applying enhancement framework",
    description: "Structuring professional-grade format",
    color: "text-yellow-400"
  },
  {
    icon: Zap,
    title: "Finalizing enhanced prompt",
    description: "Ensuring actionable and results-oriented output",
    color: "text-green-400"
  }
];

const AIThinkingDisplay = ({ prompt }: AIThinkingDisplayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [thoughts, setThoughts] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < thinkingSteps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentStep]);

  useEffect(() => {
    // Generate contextual thoughts based on the prompt
    const generateThoughts = () => {
      const wordCount = prompt.split(' ').length;
      const hasQuestion = prompt.includes('?');
      const hasContext = prompt.toLowerCase().includes('context') || prompt.toLowerCase().includes('background');
      
      const newThoughts = [
        `Prompt length: ${wordCount} words - ${wordCount > 15 ? 'Good detail level' : 'Could benefit from more context'}`,
        `Structure analysis: ${hasQuestion ? 'Question format detected' : 'Statement format - will add interrogative elements'}`,
        `Context depth: ${hasContext ? 'Context provided' : 'Adding contextual framework'}`,
        `Enhancement strategy: Applying professional formatting with actionable outcomes`
      ];
      
      setThoughts(newThoughts);
    };

    generateThoughts();
  }, [prompt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start mb-6"
    >
      <div className="flex items-start space-x-3 max-w-full w-full">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-4 h-4 text-white" />
          </motion.div>
        </div>
        
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6 flex-1">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-purple-400 rounded-full"
              />
              <span className="text-purple-300 font-medium">AI Thinking Process</span>
            </div>

            {/* Thinking Steps */}
            <div className="space-y-3">
              {thinkingSteps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: isActive ? 1 : isCompleted ? 0.8 : 0.3,
                      scale: isActive ? 1.02 : 1
                    }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 border border-white/10"
                  >
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                      <Icon className={`w-4 h-4 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{step.title}</p>
                      <p className="text-slate-400 text-xs">{step.description}</p>
                    </div>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Current Thoughts */}
            <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-purple-300 text-sm font-medium mb-2">Current Analysis:</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="text-white text-sm"
                >
                  {thoughts[currentStep] || "Processing..."}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default AIThinkingDisplay;
