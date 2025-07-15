
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Home, FileText, Save, History, Pin, Trash2, Edit, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface OffCanvasNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onTemplateSelect: (prompt: string) => void;
  onHistorySelect: (prompt: string) => void;
}

const templates = [
  {
    id: "1",
    title: "Content Creation",
    description: "Blog posts, articles, and copy",
    prompt: "Create engaging content for my target audience",
    category: "Writing",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "2", 
    title: "Code Review",
    description: "Analyze and improve code quality",
    prompt: "Review this code and suggest improvements for better performance and readability",
    category: "Development",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "3",
    title: "Business Strategy",
    description: "Strategic planning and analysis",
    prompt: "Develop a comprehensive business strategy for market expansion",
    category: "Business",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "4",
    title: "Creative Writing",
    description: "Stories, scripts, and narratives",
    prompt: "Write a compelling story with engaging characters and plot",
    category: "Creative",
    color: "from-orange-500 to-red-500"
  },
  {
    id: "5",
    title: "Research Analysis",
    description: "Data analysis and insights",
    prompt: "Analyze research data and provide actionable insights",
    category: "Research",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "6",
    title: "Marketing Campaign",
    description: "Promotional strategies and campaigns",
    prompt: "Design an effective marketing campaign for maximum reach and engagement",
    category: "Marketing",
    color: "from-teal-500 to-blue-500"
  }
];

const OffCanvasNavigation = ({ 
  isOpen, 
  onClose, 
  onNewChat, 
  onTemplateSelect, 
  onHistorySelect 
}: OffCanvasNavigationProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const { history, removeFromHistory } = usePromptHistory();
  const { savedPrompts, deletePrompt, togglePin } = useSavedPrompts();
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -400 }}
        animate={{ x: isOpen ? 0 : -400 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-80 bg-slate-950/95 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-lg font-bold text-white">PromptX</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10">
          {[
            { id: "home", label: "Home", icon: Home },
            { id: "templates", label: "Templates", icon: FileText },
            { id: "saved", label: "Saved", icon: Save },
            { id: "history", label: "History", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
                  activeSection === tab.id
                    ? "text-purple-400 bg-purple-500/10"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === "home" && (
            <div className="space-y-4">
              <Button
                onClick={onNewChat}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              <div className="text-center text-slate-400 text-sm">
                Start a fresh conversation or explore templates, saved prompts, and history.
              </div>
            </div>
          )}

          {activeSection === "templates" && (
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-4">Prompt Templates</h3>
              {templates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                  onClick={() => onTemplateSelect(template.prompt)}
                >
                  <Card className="bg-white/5 border-white/10 p-3 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${template.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{template.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeSection === "saved" && (
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-4">Saved Prompts</h3>
              {savedPrompts.length === 0 ? (
                <div className="text-center text-slate-400 text-sm py-8">
                  No saved prompts yet
                </div>
              ) : (
                savedPrompts.map((saved) => (
                  <Card key={saved.id} className="bg-white/5 border-white/10 p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h4 className="text-white font-medium text-sm line-clamp-2">
                          {saved.title}
                        </h4>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => togglePin(saved.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Pin className={`w-3 h-3 ${saved.isPinned ? 'text-yellow-400' : 'text-slate-400'}`} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deletePrompt(saved.id)}
                            className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs line-clamp-2">
                        {saved.originalPrompt}
                      </p>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onTemplateSelect(saved.originalPrompt)}
                          className="h-6 px-2 text-xs bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                        >
                          Use
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(saved.enhancedPrompt)}
                          className="h-6 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}

          {activeSection === "history" && (
            <div className="space-y-3">
              <h3 className="text-white font-medium mb-4">Chat History</h3>
              {history.length === 0 ? (
                <div className="text-center text-slate-400 text-sm py-8">
                  No history yet
                </div>
              ) : (
                history.map((item) => (
                  <Card key={item.id} className="bg-white/5 border-white/10 p-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-xs text-slate-400">
                          {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromHistory(item.id)}
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-white text-sm line-clamp-2">
                        {item.prompt}
                      </p>
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onHistorySelect(item.prompt)}
                          className="h-6 px-2 text-xs bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                        >
                          Retry
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(item.enhanced || item.prompt)}
                          className="h-6 px-2 text-xs"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default OffCanvasNavigation;
