
import { useState, useRef, useEffect } from "react";
import { Menu, Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import Sidebar from "@/components/Sidebar";
import ToolsPanel from "@/components/ToolsPanel";
import ChatMessage from "@/components/ChatMessage";
import VoiceRecognition from "@/components/VoiceRecognition";
import AIThinkingPanel from "@/components/AIThinkingPanel";
import TemplatesView from "@/components/TemplatesView";
import { cn } from "@/lib/utils";

interface ChatEntry {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  tool: string;
  grade: string;
  timestamp: Date;
}

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("specific");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showToolsPanel, setShowToolsPanel] = useState(false);
  const [currentView, setCurrentView] = useState<"chat" | "templates">("chat");
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { addToHistory } = usePromptHistory();
  const { savePrompt } = useSavedPrompts();
  const { toast } = useToast();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [prompt]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    
    // Create chat entry
    const chatEntry: ChatEntry = {
      id: Date.now().toString(),
      originalPrompt: prompt,
      enhancedPrompt: "",
      tool: selectedTool,
      grade: "",
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, chatEntry]);
    
    // Simulate AI processing with tool-specific enhancements
    setTimeout(() => {
      let enhancedPrompt = "";
      let grade = "";
      
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
          grade = "A+";
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
          grade = "B";
      }
      
      // Update the chat entry with results
      setChatHistory(prev => prev.map(entry => 
        entry.id === chatEntry.id 
          ? { ...entry, enhancedPrompt, grade }
          : entry
      ));
      
      addToHistory(prompt, enhancedPrompt);
      setPrompt("");
      setIsLoading(false);
    }, 2300);
  };

  const handleVoiceResult = (transcript: string) => {
    setPrompt(transcript);
  };

  const handleTemplateSelect = (template: any) => {
    setPrompt(template.samplePrompt);
    setCurrentView("chat");
    setIsSidebarOpen(false);
    textareaRef.current?.focus();
  };

  const handleSavePrompt = (chatEntry: ChatEntry) => {
    savePrompt(chatEntry.originalPrompt, chatEntry.enhancedPrompt);
    toast({
      title: "Prompt saved!",
      description: "Your enhanced prompt has been saved to your collection.",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleEnhance();
    }
  };

  if (currentView === "templates") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
        <TemplatesView
          onBack={() => setCurrentView("chat")}
          onSelectTemplate={handleTemplateSelect}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden flex">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/5 to-transparent rounded-full"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(view) => {
          if (view === "templates") {
            setCurrentView("templates");
          } else if (view === "new-chat") {
            setChatHistory([]);
            setPrompt("");
          }
          setIsSidebarOpen(false);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 backdrop-blur-xl">
          <Button
            onClick={() => setIsSidebarOpen(true)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            PromptX
          </h1>
          
          <div className="w-10"></div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {chatHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-6 max-w-2xl">
                <div className="relative">
                  <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in">
                    PromptX
                  </h2>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
                </div>
                <p className="text-xl text-slate-300 leading-relaxed animate-fade-in delay-300">
                  Amplify your prompts into professional-grade commands
                </p>
                <p className="text-slate-400 animate-fade-in delay-500">
                  Start by typing a prompt below or select a template from the sidebar
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((entry) => (
                <ChatMessage
                  key={entry.id}
                  chatEntry={entry}
                  isLoading={isLoading && !entry.enhancedPrompt}
                  onSave={() => handleSavePrompt(entry)}
                />
              ))}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Fixed Bottom Input */}
        <div className="border-t border-white/10 backdrop-blur-xl bg-black/20 p-4">
          <div className="max-w-4xl mx-auto relative">
            {/* Tools Panel */}
            {showToolsPanel && (
              <div className="absolute bottom-full left-0 mb-2 animate-scale-in">
                <ToolsPanel
                  selectedTool={selectedTool}
                  onToolSelect={setSelectedTool}
                  onClose={() => setShowToolsPanel(false)}
                />
              </div>
            )}

            <div className="flex items-end gap-3">
              {/* Tools Button */}
              <Button
                onClick={() => setShowToolsPanel(!showToolsPanel)}
                variant="outline"
                size="sm"
                className={cn(
                  "bg-white/5 border-white/20 text-white hover:bg-white/10 transition-all duration-300",
                  showToolsPanel && "bg-purple-500/20 border-purple-500/30"
                )}
              >
                🎛 Tools
              </Button>

              {/* Input Container */}
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  placeholder="Message PromptX... (Ctrl+Enter to send)"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-12 max-h-32 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300 resize-none pr-20"
                  disabled={isLoading}
                />
                
                {/* Voice Input */}
                <div className="absolute right-12 bottom-3">
                  <VoiceRecognition
                    isListening={isListening}
                    onStart={() => setIsListening(true)}
                    onStop={() => setIsListening(false)}
                    onResult={handleVoiceResult}
                  />
                </div>

                {/* Send Button */}
                <Button
                  onClick={handleEnhance}
                  disabled={!prompt.trim() || isLoading}
                  size="sm"
                  className="absolute right-2 bottom-2 h-8 w-8 p-0 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Selected Tool Indicator */}
            {selectedTool && (
              <div className="mt-2 text-xs text-slate-400">
                Selected: {selectedTool === "specific" ? "✨ Specific Enhance" : 
                          selectedTool === "ultra" ? "⚡ Ultra Enhance" : 
                          "🔁 Reverse Query"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
