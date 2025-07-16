
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, Clock } from "lucide-react";

interface AIThinkingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string | null;
}

const thinkingSteps = [
  {
    id: 1,
    title: "Analyzing Input",
    description: "Processing your prompt to understand intent and context...",
    duration: 800
  },
  {
    id: 2,
    title: "Improving Clarity",
    description: "Rephrasing vague phrases and enhancing readability...",
    duration: 1000
  },
  {
    id: 3,
    title: "Enhancing Specificity",
    description: "Adding specific details and context for better results...",
    duration: 1200
  },
  {
    id: 4,
    title: "Structuring Output",
    description: "Organizing information in a logical, actionable format...",
    duration: 900
  },
  {
    id: 5,
    title: "Quality Assurance",
    description: "Reviewing enhanced prompt for completeness and effectiveness...",
    duration: 600
  }
];

const AIThinkingPanel = ({ isOpen, onClose, messageId }: AIThinkingPanelProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let stepIndex = 0;
    
    const runStep = () => {
      if (stepIndex < thinkingSteps.length) {
        setCurrentStep(stepIndex);
        
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, stepIndex]);
          stepIndex++;
          runStep();
        }, thinkingSteps[stepIndex].duration);
      }
    };

    const timer = setTimeout(runStep, 500);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-80 sm:w-96 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 text-white p-0"
      >
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="flex items-center space-x-3 text-xl font-bold text-white">
            <Brain className="w-6 h-6 text-purple-400" />
            <span>AI Thinking Process</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-6 space-y-6">
          <div className="text-center mb-8">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
              <Brain className="absolute top-1/2 left-1/2 w-8 h-8 text-purple-400 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-slate-400 text-sm">
              Watch how your prompt is being enhanced step by step
            </p>
          </div>

          <div className="space-y-4">
            {thinkingSteps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = completedSteps.includes(index);
              const isPending = index > currentStep;

              return (
                <div
                  key={step.id}
                  className={`relative p-4 rounded-lg border transition-all duration-500 ${
                    isActive
                      ? 'bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : isCompleted
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-purple-500 text-white animate-pulse'
                        : 'bg-slate-600 text-slate-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isActive ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : (
                        <span className="text-xs font-bold">{step.id}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-medium ${
                          isActive ? 'text-purple-300' : 
                          isCompleted ? 'text-green-300' : 
                          'text-slate-400'
                        }`}>
                          {step.title}
                        </h3>
                        
                        {isActive && (
                          <Badge className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse">
                            Processing...
                          </Badge>
                        )}
                        
                        {isCompleted && (
                          <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30">
                            Complete
                          </Badge>
                        )}
                      </div>
                      
                      <p className={`text-sm ${
                        isActive ? 'text-purple-200' : 
                        isCompleted ? 'text-green-200' : 
                        'text-slate-500'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg animate-pulse"></div>
                  )}
                </div>
              );
            })}
          </div>

          {completedSteps.length === thinkingSteps.length && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-purple-500/20 border border-green-500/30 rounded-lg animate-fade-in">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium text-green-300">Enhancement Complete!</span>
              </div>
              <p className="text-sm text-green-200">
                Your prompt has been successfully enhanced with professional-grade optimization techniques.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIThinkingPanel;
