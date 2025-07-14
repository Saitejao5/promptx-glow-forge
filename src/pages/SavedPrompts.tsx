
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Edit3, Trash2, Pin, PinOff, Search, ArrowRight } from "lucide-react";
import { useSavedPrompts } from "@/hooks/useSavedPrompts";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const SavedPrompts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { savedPrompts, deletePrompt, togglePin } = useSavedPrompts();
  const { toast } = useToast();

  const filteredPrompts = savedPrompts.filter(prompt =>
    prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prompt.originalPrompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deletePrompt(id);
    toast({
      title: "Prompt deleted",
      description: "The saved prompt has been removed.",
    });
  };

  const handlePin = (id: string) => {
    togglePin(id);
    toast({
      title: "Prompt updated",
      description: "The prompt pin status has been changed.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-4">
              Saved Prompts
            </h1>
            <p className="text-xl text-slate-300">
              Your collection of enhanced prompts
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search saved prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Prompts Grid */}
          {filteredPrompts.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
              <p className="text-slate-400 text-lg">
                {searchQuery ? "No prompts match your search." : "No saved prompts yet."}
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt, index) => (
                <Card
                  key={prompt.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-white truncate pr-2">
                        {prompt.title}
                      </h3>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handlePin(prompt.id)}
                        className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                      >
                        {prompt.isPinned ? (
                          <Pin className="w-4 h-4 text-purple-400" />
                        ) : (
                          <PinOff className="w-4 h-4 text-slate-400" />
                        )}
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-white/10 border-white/20 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Preview */}
                    <div className="space-y-2">
                      <p className="text-sm text-slate-300 line-clamp-2">
                        {prompt.originalPrompt}
                      </p>
                      <ArrowRight className="w-4 h-4 text-purple-400 mx-auto" />
                      <p className="text-sm text-white line-clamp-3 bg-white/5 p-2 rounded">
                        {prompt.enhancedPrompt}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs text-slate-500">
                      Saved {formatDistanceToNow(prompt.timestamp, { addSuffix: true })}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                        >
                          Enhance Again
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(prompt.id)}
                        className="text-red-400 hover:bg-red-500/20 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPrompts;
