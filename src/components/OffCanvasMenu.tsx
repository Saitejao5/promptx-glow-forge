
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Home, Bookmark, Clock, Info, Folder } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelectTemplate: (template: any) => void;
}

const promptTemplates = [
  {
    id: "educational-website",
    emoji: "📚",
    title: "Educational Website",
    description: "Create comprehensive educational content and course structures",
    samplePrompt: "Design a complete online course about web development for beginners...",
    category: "Education"
  },
  {
    id: "portfolio-generator",
    emoji: "💼",
    title: "Portfolio Generator",
    description: "Build impressive professional portfolios and personal brands",
    samplePrompt: "Create a compelling portfolio website for a UX designer with 3 years experience...",
    category: "Professional"
  },
  {
    id: "creative-writing",
    emoji: "✍️",
    title: "Creative Writing",
    description: "Generate stories, poems, and creative content with depth",
    samplePrompt: "Write a mystery short story set in a small coastal town during a storm...",
    category: "Creative"
  },
  {
    id: "business-strategy",
    emoji: "📊",
    title: "Business Strategy",
    description: "Develop comprehensive business plans and market analysis",
    samplePrompt: "Create a go-to-market strategy for a new SaaS productivity tool...",
    category: "Business"
  },
  {
    id: "social-media",
    emoji: "📱",
    title: "Social Media Content",
    description: "Craft engaging posts and content strategies for all platforms",
    samplePrompt: "Generate a week of Instagram content for a sustainable fashion brand...",
    category: "Marketing"
  },
  {
    id: "technical-docs",
    emoji: "🔧",
    title: "Technical Documentation",
    description: "Write clear, comprehensive technical guides and API docs",
    samplePrompt: "Create documentation for a REST API with authentication examples...",
    category: "Technical"
  },
  {
    id: "email-marketing",
    emoji: "📧",
    title: "Email Marketing",
    description: "Create compelling email campaigns and sequences",
    samplePrompt: "Write a welcome email sequence for a fitness app...",
    category: "Marketing"
  },
  {
    id: "data-analysis",
    emoji: "📈",
    title: "Data Analysis",
    description: "Generate insights and reports from data sets",
    samplePrompt: "Analyze customer behavior data to improve retention...",
    category: "Analytics"
  },
  {
    id: "product-launch",
    emoji: "🚀",
    title: "Product Launch",
    description: "Plan and execute successful product launches",
    samplePrompt: "Create a 90-day product launch plan for a mobile app...",
    category: "Business"
  }
];

const OffCanvasMenu = ({ isOpen, onClose, onNewChat, onSelectTemplate }: OffCanvasMenuProps) => {
  const [activeSection, setActiveSection] = useState<'main' | 'templates' | 'saved' | 'history' | 'about'>('main');

  const menuItems = [
    { id: 'main', icon: Home, label: 'New Chat', description: 'Start a fresh conversation' },
    { id: 'templates', icon: Folder, label: 'Templates', description: 'Browse prompt templates' },
    { id: 'saved', icon: Bookmark, label: 'Saved', description: 'Your saved prompts' },
    { id: 'history', icon: Clock, label: 'History', description: 'Recent conversations' },
    { id: 'about', icon: Info, label: 'About Us', description: 'Learn more about PromptX' },
  ];

  const handleMenuClick = (sectionId: string) => {
    if (sectionId === 'main') {
      onNewChat();
      onClose();
    } else {
      setActiveSection(sectionId as any);
    }
  };

  const handleTemplateSelect = (template: any) => {
    onSelectTemplate(template);
    onClose();
  };

  const renderMainMenu = () => (
    <div className="space-y-3">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            variant="ghost"
            className="w-full justify-start p-4 h-auto text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex items-center space-x-3">
              <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
              <div>
                <div className="font-medium text-white group-hover:text-purple-200">
                  {item.label}
                </div>
                <div className="text-sm text-slate-400 group-hover:text-slate-300">
                  {item.description}
                </div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-4">
      <Button
        onClick={() => setActiveSection('main')}
        variant="ghost"
        className="mb-4 text-purple-300 hover:text-white"
      >
        ← Back to Menu
      </Button>
      
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {promptTemplates.map((template) => (
          <Card
            key={template.id}
            className="bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02] p-4 cursor-pointer group"
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {template.emoji}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {template.title}
                    </h3>
                    <Badge variant="outline" className="text-xs text-purple-300/70 border-purple-500/30">
                      {template.category}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-300 group-hover:text-slate-200 transition-colors">
                {template.description}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-lg p-3 group-hover:bg-white/10 transition-all">
                <p className="text-xs text-slate-400 mb-1">Sample Prompt:</p>
                <p className="text-sm text-slate-300 italic">
                  "{template.samplePrompt}"
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600/80 to-purple-600/80 hover:from-cyan-500 hover:to-purple-500 text-white border-0"
                >
                  Try Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderOtherSections = () => (
    <div className="space-y-4">
      <Button
        onClick={() => setActiveSection('main')}
        variant="ghost"
        className="mb-4 text-purple-300 hover:text-white"
      >
        ← Back to Menu
      </Button>
      
      <div className="text-center text-slate-400 py-8">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <p>This section is coming soon!</p>
        <p className="text-sm mt-2">We're working on adding more features.</p>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="left" 
        className="w-80 sm:w-96 bg-slate-950/95 backdrop-blur-xl border-r border-white/10 text-white p-0"
      >
        <SheetHeader className="p-6 border-b border-white/10">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            PromptX Menu
          </SheetTitle>
        </SheetHeader>
        
        <div className="p-6">
          {activeSection === 'main' && renderMainMenu()}
          {activeSection === 'templates' && renderTemplates()}
          {(activeSection === 'saved' || activeSection === 'history' || activeSection === 'about') && renderOtherSections()}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OffCanvasMenu;
