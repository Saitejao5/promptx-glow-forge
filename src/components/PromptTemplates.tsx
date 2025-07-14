
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface PromptTemplate {
  id: string;
  emoji: string;
  title: string;
  description: string;
  samplePrompt: string;
  category: string;
}

const promptTemplates: PromptTemplate[] = [
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
  }
];

interface PromptTemplatesProps {
  onSelectTemplate?: (template: PromptTemplate) => void;
}

const PromptTemplates = ({ onSelectTemplate }: PromptTemplatesProps) => {
  const handleTryNow = (template: PromptTemplate) => {
    onSelectTemplate?.(template);
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Prompt Templates
            </h2>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Jump-start your creativity with our curated collection of professional prompt templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promptTemplates.map((template, index) => (
            <Card
              key={template.id}
              className="group relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

              <div className="relative p-8 space-y-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {template.emoji}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {template.title}
                      </h3>
                      <span className="text-sm text-purple-300/70 font-medium">
                        {template.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                  {template.description}
                </p>

                {/* Sample Prompt */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 group-hover:bg-white/10 group-hover:border-cyan-500/20 transition-all duration-300 flex-1">
                  <p className="text-sm text-slate-400 mb-2 font-medium">Sample Prompt:</p>
                  <p className="text-slate-300 text-sm leading-relaxed italic group-hover:text-slate-200 transition-colors duration-300">
                    "{template.samplePrompt}"
                  </p>
                </div>

                {/* Try Now Button */}
                <Button
                  onClick={() => handleTryNow(template)}
                  className="w-full bg-gradient-to-r from-cyan-600/80 to-purple-600/80 hover:from-cyan-500 hover:to-purple-500 text-white font-medium py-3 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group/btn border-0"
                >
                  <span className="mr-2">Try Now</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in delay-1000">
          <p className="text-slate-500 text-sm mb-4">
            Need a custom template? Let us know what you're working on!
          </p>
          <Button 
            variant="outline" 
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300"
          >
            Request Custom Template
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PromptTemplates;
