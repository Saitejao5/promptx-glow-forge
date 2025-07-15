
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { History, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import PromptInput from "@/components/PromptInput";
import InlineExamples from "@/components/InlineExamples";
import EnhancedResultDisplay from "@/components/EnhancedResultDisplay";
import PromptHistorySidebar from "@/components/PromptHistorySidebar";
import PromptTemplates from "@/components/PromptTemplates";
import PromptAnalyzer from "@/components/PromptAnalyzer";
import FloatingToolbar from "@/components/FloatingToolbar";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false);
  
  // Tool states
  const [activeTools, setActiveTools] = useState({
    history: true,
    saved: false,
    blocks: false,
    analyzer: true,
  });

  const { addToHistory } = usePromptHistory();
  const { savePrompt } = useSavedPrompts();
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResult("");
    
    // Simulate AI processing with tool-specific enhancements
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
      
      setResult(enhancedPrompt);
      addToHistory(prompt, enhancedPrompt);
      setIsLoading(false);
    }, 2300);
  };

  const handleTryAgain = () => {
    handleEnhance();
  };

  const handleSaveTemplate = () => {
    if (prompt && result) {
      savePrompt(prompt, result);
      toast({
        title: "Prompt saved!",
        description: "Your enhanced prompt has been saved to your collection.",
      });
    }
  };

  const handleSelectTemplate = (template: any) => {
    setPrompt(template.samplePrompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReusePrompt = (reusedPrompt: string) => {
    setPrompt(reusedPrompt);
    setIsHistorySidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditPrompt = (editPrompt: string) => {
    setPrompt(editPrompt);
    setIsHistorySidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImproveMetric = (metric: string) => {
    toast({
      title: `Improving ${metric}`,
      description: "AI enhancement suggestions coming soon!",
    });
  };

  const toggleTool = (tool: keyof typeof activeTools) => {
    setActiveTools(prev => ({ ...prev, [tool]: !prev[tool] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      <Navigation />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/5 to-transparent rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-8">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in">
              PromptX
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          </div>

          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Amplify your prompts into professional-grade commands
          </p>

          <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300 px-4 py-2 animate-fade-in delay-500">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Enhancement
          </Badge>
        </div>

        {/* Main Input Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl p-8 animate-scale-in delay-700">
            <div className="space-y-6">
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                onSubmit={handleEnhance}
                isLoading={isLoading}
                selectedTool={selectedTool}
                onToolSelect={setSelectedTool}
              />
            </div>
          </Card>

          {/* Inline Examples */}
          <InlineExamples onSelectExample={setPrompt} />

          {/* History Sidebar Toggle */}
          <div className="flex justify-end">
            <Button
              onClick={() => setIsHistorySidebarOpen(true)}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30"
            >
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>

          {/* Result Display Section */}
          <EnhancedResultDisplay
            isLoading={isLoading}
            result={result}
            originalPrompt={prompt}
            onTryAgain={handleTryAgain}
            onSaveTemplate={handleSaveTemplate}
            onEditPrompt={handleEditPrompt}
          />

          {/* Prompt Analyzer */}
          {activeTools.analyzer && result && (
            <PromptAnalyzer 
              prompt={prompt}
              onImprove={handleImproveMetric}
            />
          )}
        </div>
      </div>

      {/* Prompt Templates Section */}
      <PromptTemplates onSelectTemplate={handleSelectTemplate} />

      {/* Footer Section */}
      <div className="relative z-10 text-center py-20 animate-fade-in delay-1000">
        <p className="text-slate-500 text-sm">
          Powered by advanced AI • Built for professionals
        </p>
      </div>

      {/* History Sidebar */}
      <PromptHistorySidebar
        isOpen={isHistorySidebarOpen}
        onClose={() => setIsHistorySidebarOpen(false)}
        onReusePrompt={handleReusePrompt}
        onEditPrompt={handleEditPrompt}
      />

      {/* Floating Toolbar */}
      <FloatingToolbar 
        activeTools={activeTools}
        onToggleTool={toggleTool}
      />
    </div>
  );
};

export default Index;
