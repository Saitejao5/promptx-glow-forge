
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wrench, Lightbulb, Bot, FileText, Sparkles, ArrowRight } from "lucide-react";
import ResultDisplay from "@/components/ResultDisplay";
import PromptTemplates from "@/components/PromptTemplates";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const tools = [
    { icon: Wrench, label: "Specific Enhance", description: "Target specific improvements" },
    { icon: Lightbulb, label: "Ultra Enhance", description: "Maximum enhancement power" },
    { icon: Bot, label: "Reverse Query", description: "Generate from outcomes" },
    { icon: FileText, label: "Prompt Templates", description: "Pre-built templates" },
  ];

  const handleEnhance = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setResult("");
    
    // Simulate AI processing
    setTimeout(() => {
      const enhancedPrompt = `You are an expert ${prompt.toLowerCase().includes('write') ? 'writer' : 'professional'} with extensive experience in your field. Your task is to ${prompt}

Consider the following aspects:
• Context and background information
• Target audience and their needs  
• Specific deliverables and outcomes
• Quality standards and best practices
• Timeline and resource constraints

Please provide a comprehensive response that demonstrates deep expertise while being practical and actionable. Structure your response clearly and include relevant examples where appropriate.`;
      
      setResult(enhancedPrompt);
      setIsLoading(false);
    }, 2300);
  };

  const handleTryAgain = () => {
    handleEnhance();
  };

  const handleSaveTemplate = () => {
    // Save template logic would go here
  };

  const handleSelectTemplate = (template: any) => {
    setPrompt(template.samplePrompt);
    // Scroll to input section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-600/5 to-transparent rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-8">
          {/* Animated Title */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-fade-in">
              PromptX
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl animate-pulse"></div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-300">
            Amplify your prompts into professional-grade commands
          </p>

          {/* Beta Badge */}
          <Badge variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300 px-4 py-2 animate-fade-in delay-500">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Enhancement
          </Badge>
        </div>

        {/* Main Input Section */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Glassmorphic Input Card */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl p-8 animate-scale-in delay-700">
            <div className="space-y-6">
              <div className="relative group">
                <Input
                  placeholder="Enter your prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="h-16 text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Tool Toolbar */}
              <div className="flex flex-wrap justify-center gap-4">
                {tools.map((tool, index) => (
                  <button
                    key={tool.label}
                    className="group flex items-center space-x-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-full transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${800 + index * 100}ms` }}
                  >
                    <tool.icon className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {tool.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Enhance Button */}
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleEnhance}
                  disabled={!prompt.trim() || isLoading}
                  className="h-14 px-8 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="mr-3">
                    {isLoading ? "Enhancing..." : "Enhance Prompt"}
                  </span>
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-md blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </Button>
              </div>
            </div>
          </Card>

          {/* Result Display Section */}
          <ResultDisplay
            isLoading={isLoading}
            result={result}
            onTryAgain={handleTryAgain}
            onSaveTemplate={handleSaveTemplate}
          />

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {tools.map((tool, index) => (
              <Card
                key={tool.label}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: `${1000 + index * 150}ms` }}
              >
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="w-6 h-6 text-purple-300" />
                  </div>
                  <h3 className="font-semibold text-white">{tool.label}</h3>
                  <p className="text-sm text-slate-400">{tool.description}</p>
                </div>
              </Card>
            ))}
          </div>
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
    </div>
  );
};

export default Index;
