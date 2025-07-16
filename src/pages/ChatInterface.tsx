
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import FixedPromptInput from "@/components/FixedPromptInput";
import ChatMessages from "@/components/ChatMessages";
import OffCanvasMenu from "@/components/OffCanvasMenu";
import AIThinkingPanel from "@/components/AIThinkingPanel";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  originalPrompt?: string;
  grade?: string;
  summary?: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>("ultra");
  const [showThinking, setShowThinking] = useState<string | null>(null);
  
  const { addToHistory } = usePromptHistory();
  const { savePrompt } = useSavedPrompts();
  const { toast } = useToast();

  const handlePromptSubmit = async (prompt: string) => {
    if (!prompt.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: prompt,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let enhancedPrompt = "";
      let grade = "";
      let summary = "";
      
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

Please provide an expert-level response that demonstrates deep domain knowledge while being immediately practical and results-oriented.`;
          grade = "A+";
          summary = "Professional prompt optimized for expert-level strategic thinking and comprehensive analysis.";
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
          grade = "A";
          summary = "Focused prompt enhanced for specific, actionable outcomes with clear deliverables.";
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
          grade = "B+";
          summary = "Reverse-engineered prompt structured to work backwards from desired outcomes.";
          break;
          
        default:
          enhancedPrompt = prompt;
          grade = "B";
          summary = "Basic prompt processing completed.";
      }
      
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: enhancedPrompt,
        originalPrompt: prompt,
        grade,
        summary,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      addToHistory(prompt, enhancedPrompt);
      setIsLoading(false);
    }, 2300);
  };

  const handleSavePrompt = (message: ChatMessage) => {
    if (message.content && message.originalPrompt) {
      savePrompt(message.originalPrompt, message.content);
      toast({
        title: "Prompt saved!",
        description: "Your enhanced prompt has been saved to your collection.",
      });
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setIsMenuOpen(false);
  };

  const handleSelectTemplate = (template: any) => {
    // This will be handled by the FixedPromptInput component
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/5 to-transparent rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/10 backdrop-blur-xl">
        <Button
          onClick={() => setIsMenuOpen(true)}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          PromptX
        </h1>
        
        <div className="w-10" /> {/* Spacer for balance */}
      </div>

      {/* Main Chat Area */}
      <div className="relative z-10 flex flex-col h-[calc(100vh-80px)]">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
            onSavePrompt={handleSavePrompt}
            onShowThinking={setShowThinking}
            showThinking={showThinking}
          />
        </div>

        {/* Fixed Bottom Input */}
        <FixedPromptInput
          onSubmit={handlePromptSubmit}
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
          isLoading={isLoading}
        />
      </div>

      {/* Off-Canvas Menu */}
      <OffCanvasMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNewChat={handleNewChat}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* AI Thinking Panel */}
      <AIThinkingPanel 
        isOpen={!!showThinking}
        onClose={() => setShowThinking(null)}
        messageId={showThinking}
      />
    </div>
  );
};

export default ChatInterface;
