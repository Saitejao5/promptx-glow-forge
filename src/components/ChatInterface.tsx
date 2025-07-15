
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, FileText, Save, History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import { useToast } from "@/hooks/use-toast";
import OffCanvasNavigation from "./OffCanvasNavigation";
import FixedPromptInput from "./FixedPromptInput";
import ChatMessage from "./ChatMessage";
import AIThinkingDisplay from "./AIThinkingDisplay";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  originalPrompt?: string;
  timestamp: number;
  isLoading?: boolean;
  selectedTool?: string | null;
}

const ChatInterface = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showThinking, setShowThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { addToHistory } = usePromptHistory();
  const { savePrompt } = useSavedPrompts();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setMessages([]);
    setIsNavOpen(false);
    toast({
      title: "New chat started",
      description: "Ready for your next prompt enhancement!",
    });
  };

  const handlePromptSubmit = async (prompt: string, selectedTool: string | null) => {
    if (!prompt.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt,
      timestamp: Date.now(),
      selectedTool,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    // Add loading assistant message
    const loadingMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      originalPrompt: prompt,
      timestamp: Date.now(),
      isLoading: true,
    };

    setMessages(prev => [...prev, loadingMessage]);

    // Simulate AI processing
    setTimeout(() => {
      let enhancedPrompt = "";
      
      switch (selectedTool) {
        case "ultra":
          enhancedPrompt = `You are a world-class expert and thought leader with decades of experience in your field. Your task is to ${prompt}

**Context & Strategic Approach:**
• Analyze the broader ecosystem and market dynamics
• Consider both immediate and long-term implications
• Integrate best practices from leading organizations
• Account for potential risks and mitigation strategies

**Execution Framework:**
• Target audience analysis and stakeholder mapping
• Resource optimization and timeline considerations
• Quality assurance and success metrics
• Iterative improvement and feedback loops

**Deliverables:**
• Comprehensive, actionable recommendations
• Clear implementation roadmap with milestones
• Risk assessment and contingency planning
• Success measurement criteria

Please provide an expert-level response that demonstrates deep domain knowledge while being immediately practical and results-oriented. Include specific examples and cite relevant frameworks where appropriate.`;
          break;
          
        case "specific":
          enhancedPrompt = `You are a specialist consultant focused on delivering targeted, specific solutions. Your task is to ${prompt}

**Specific Requirements:**
• Define exact deliverables and outcomes
• Identify key constraints and parameters
• Specify tools, technologies, or methodologies
• Establish clear success criteria

**Targeted Approach:**
• Focus on the most critical aspects
• Provide step-by-step guidance
• Include specific examples and templates
• Address common pitfalls and solutions

Please provide a focused, specific response that directly addresses the core requirements with actionable detail.`;
          break;
          
        case "reverse":
          enhancedPrompt = `Working backwards from the desired outcome, help me achieve: ${prompt}

**Reverse Engineering Process:**
• Start with the end goal clearly defined
• Identify the final deliverable or outcome
• Map the critical path backwards
• Determine required inputs and prerequisites

**Implementation Strategy:**
• Break down into achievable milestones
• Identify dependencies and bottlenecks
• Create a timeline working backwards
• Establish checkpoints and validation steps

Please structure your response as a reverse-engineered plan that ensures we reach the desired outcome efficiently.`;
          break;
          
        default:
          enhancedPrompt = `You are an expert professional with extensive experience in your field. Your task is to ${prompt}

Consider the following aspects:
• Context and background information
• Target audience and their needs  
• Specific deliverables and outcomes
• Quality standards and best practices
• Timeline and resource constraints

Please provide a comprehensive response that demonstrates deep expertise while being practical and actionable. Structure your response clearly and include relevant examples where appropriate.`;
      }

      // Update the loading message with the result
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, content: enhancedPrompt, isLoading: false }
          : msg
      ));

      addToHistory(prompt, enhancedPrompt);
      setIsProcessing(false);
    }, 2500);
  };

  const handleSavePrompt = (originalPrompt: string, enhancedPrompt: string) => {
    savePrompt(originalPrompt, enhancedPrompt);
    toast({
      title: "Prompt saved!",
      description: "Your enhanced prompt has been saved to your collection.",
    });
  };

  const handleTemplateSelect = (templatePrompt: string) => {
    setIsNavOpen(false);
    // Auto-submit the template
    setTimeout(() => {
      handlePromptSubmit(templatePrompt, null);
    }, 300);
  };

  const handleHistorySelect = (historyPrompt: string) => {
    setIsNavOpen(false);
    // Auto-submit the history prompt
    setTimeout(() => {
      handlePromptSubmit(historyPrompt, null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header with Navigation Toggle */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNavOpen(true)}
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                PromptX
              </span>
            </motion.div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNewChat}
              className="text-slate-300 hover:text-white hover:bg-white/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="relative z-10 pt-16 pb-32 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          {messages.length === 0 ? (
            // Welcome Screen
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(147, 51, 234, 0.3)",
                    "0 0 40px rgba(147, 51, 234, 0.5)",
                    "0 0 20px rgba(147, 51, 234, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                PromptX
              </motion.h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Transform your ideas into professional-grade prompts with AI enhancement
              </p>
            </motion.div>
          ) : (
            // Chat Messages
            <div className="space-y-8 py-8">
              <AnimatePresence>
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    onSave={handleSavePrompt}
                    onTryAgain={() => message.originalPrompt && handlePromptSubmit(message.originalPrompt, message.selectedTool || null)}
                  />
                ))}
              </AnimatePresence>
              
              {/* AI Thinking Display */}
              <AnimatePresence>
                {isProcessing && showThinking && (
                  <AIThinkingDisplay prompt={messages[messages.length - 2]?.content || ""} />
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Input */}
      <FixedPromptInput
        onSubmit={handlePromptSubmit}
        isProcessing={isProcessing}
        showThinking={showThinking}
        onToggleThinking={setShowThinking}
      />

      {/* Off-Canvas Navigation */}
      <OffCanvasNavigation
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onNewChat={handleNewChat}
        onTemplateSelect={handleTemplateSelect}
        onHistorySelect={handleHistorySelect}
      />
    </div>
  );
};

export default ChatInterface;
