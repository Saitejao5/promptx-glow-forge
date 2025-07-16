
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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
    samplePrompt: "Design a complete online course about web development for beginners with interactive modules, assignments, and progress tracking",
    category: "Education"
  },
  {
    id: "portfolio-generator",
    emoji: "💼",
    title: "Portfolio Generator",
    description: "Build impressive professional portfolios and personal brands",
    samplePrompt: "Create a compelling portfolio website for a UX designer with 3 years experience, showcasing 5 major projects and client testimonials",
    category: "Professional"
  },
  {
    id: "creative-writing",
    emoji: "✍️",
    title: "Creative Writing",
    description: "Generate stories, poems, and creative content with depth",
    samplePrompt: "Write a mystery short story set in a small coastal town during a storm, featuring a lighthouse keeper who discovers an old journal",
    category: "Creative"
  },
  {
    id: "business-strategy",
    emoji: "📊",
    title: "Business Strategy",
    description: "Develop comprehensive business plans and market analysis",
    samplePrompt: "Create a go-to-market strategy for a new SaaS productivity tool targeting remote teams, including pricing, distribution, and competitive analysis",
    category: "Business"
  },
  {
    id: "social-media",
    emoji: "📱",
    title: "Social Media Content",
    description: "Craft engaging posts and content strategies for all platforms",
    samplePrompt: "Generate a week of Instagram content for a sustainable fashion brand, including posts, stories, and reels with engagement strategies",
    category: "Marketing"
  },
  {
    id: "technical-docs",
    emoji: "🔧",
    title: "Technical Documentation",
    description: "Write clear, comprehensive technical guides and API docs",
    samplePrompt: "Create documentation for a REST API with authentication examples, error handling, and code samples in multiple programming languages",
    category: "Technical"
  },
  {
    id: "email-marketing",
    emoji: "📧",
    title: "Email Marketing",
    description: "Design effective email campaigns and sequences",
    samplePrompt: "Create a 5-email onboarding sequence for a new fitness app, including welcome, feature introduction, and engagement optimization",
    category: "Marketing"
  },
  {
    id: "product-launch",
    emoji: "🚀",
    title: "Product Launch",
    description: "Plan comprehensive product launch strategies",
    samplePrompt: "Develop a product launch plan for a new mobile app, including pre-launch buzz, launch day activities, and post-launch growth strategies",
    category: "Business"
  },
  {
    id: "content-strategy",
    emoji: "📝",
    title: "Content Strategy",
    description: "Build comprehensive content marketing plans",
    samplePrompt: "Create a 3-month content strategy for a B2B software company targeting CTO and tech leads, including blog posts, whitepapers, and webinars",
    category: "Marketing"
  },
  {
    id: "user-research",
    emoji: "🔍",
    title: "User Research",
    description: "Design user research studies and surveys",
    samplePrompt: "Design a comprehensive user research study for an e-commerce mobile app, including user interviews, surveys, and usability testing protocols",
    category: "Research"
  },
  {
    id: "ai-prompting",
    emoji: "🤖",
    title: "AI Prompting",
    description: "Create effective prompts for AI tools and workflows",
    samplePrompt: "Design a prompt engineering framework for generating high-converting ad copy using AI, including context setting and output formatting",
    category: "AI/Tech"
  },
  {
    id: "crisis-management",
    emoji: "🚨",
    title: "Crisis Management",
    description: "Develop crisis communication and management plans",
    samplePrompt: "Create a crisis management communication plan for a tech startup facing a data breach, including internal and external messaging strategies",
    category: "Business"
  },
  {
    id: "learning-curriculum",
    emoji: "🎓",
    title: "Learning Curriculum",
    description: "Design structured learning paths and curricula",
    samplePrompt: "Design a 12-week online curriculum for teaching data science to business professionals, including practical projects and assessment methods",
    category: "Education"
  },
  {
    id: "brand-messaging",
    emoji: "🎨",
    title: "Brand Messaging",
    description: "Develop compelling brand voice and messaging",
    samplePrompt: "Create a comprehensive brand messaging guide for a sustainable tech startup, including brand voice, key messages, and communication guidelines",
    category: "Branding"
  },
  {
    id: "innovation-workshop",
    emoji: "💡",
    title: "Innovation Workshop",
    description: "Design creative workshops and brainstorming sessions",
    samplePrompt: "Design a 2-day innovation workshop for corporate teams to generate new product ideas, including activities, facilitation guides, and outcome frameworks",
    category: "Innovation"
  }
];

interface TemplatesViewProps {
  onBack: () => void;
  onSelectTemplate: (template: PromptTemplate) => void;
}

const TemplatesView = ({ onBack, onSelectTemplate }: TemplatesViewProps) => {
  const categories = [...new Set(promptTemplates.map(t => t.category))];

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10 backdrop-blur-xl">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Chat
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Prompt Templates
          </h1>
          <p className="text-slate-400 mt-1">Choose from our curated collection</p>
        </div>
        
        <div className="w-24"></div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-cyan-400" />
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {promptTemplates
                  .filter(template => template.category === category)
                  .map((template, index) => (
                    <Card
                      key={template.id}
                      className="group relative bg-white/5 backdrop-blur-xl border-white/10 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 overflow-hidden animate-fade-in cursor-pointer"
                      style={{ animationDelay: `${(categoryIndex * 3 + index) * 100}ms` }}
                      onClick={() => onSelectTemplate(template)}
                    >
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                      <div className="relative p-6 space-y-4 h-full flex flex-col">
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
                          <p className="text-slate-300 text-sm leading-relaxed italic group-hover:text-slate-200 transition-colors duration-300 line-clamp-3">
                            "{template.samplePrompt}"
                          </p>
                        </div>

                        {/* Try Now Button */}
                        <Button
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;
