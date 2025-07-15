
import { Card } from "@/components/ui/card";

interface InlineExamplesProps {
  onSelectExample: (example: string) => void;
}

const examples = [
  { emoji: "📚", text: "Make a portfolio site", category: "website" },
  { emoji: "💡", text: "Generate AI quiz", category: "content" },
  { emoji: "🚀", text: "Create landing page copy", category: "marketing" },
  { emoji: "🎨", text: "Design mobile app interface", category: "design" },
  { emoji: "⚡", text: "Automate email workflows", category: "automation" },
];

const InlineExamples = ({ onSelectExample }: InlineExamplesProps) => {
  return (
    <div className="mt-6">
      <p className="text-sm text-slate-400 mb-3">Quick start examples:</p>
      <div className="flex flex-wrap gap-3">
        {examples.map((example, index) => (
          <Card
            key={index}
            onClick={() => onSelectExample(example.text)}
            className="bg-white/5 backdrop-blur-xl border-white/10 p-3 cursor-pointer hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{example.emoji}</span>
              <span className="text-sm text-white group-hover:text-purple-200 transition-colors">
                {example.text}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InlineExamples;
