
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Search, RotateCcw, Trash2, ArrowRight } from "lucide-react";
import { usePromptHistory } from "@/hooks/usePromptHistory";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

const PromptHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { history, clearHistory, removeFromHistory } = usePromptHistory();
  const { toast } = useToast();

  const filteredHistory = history.filter(item =>
    item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    clearHistory();
    toast({
      title: "History cleared",
      description: "All prompt history has been removed.",
    });
  };

  const handleRemoveItem = (id: string) => {
    removeFromHistory(id);
    toast({
      title: "Item removed",
      description: "The prompt has been removed from history.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <History className="w-12 h-12 text-purple-400" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                Prompt History
              </h1>
            </div>
            <p className="text-xl text-slate-300">
              Your recent prompt interactions
            </p>
          </div>

          {/* Search & Actions */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-slate-400"
              />
            </div>
            
            {history.length > 0 && (
              <div className="flex justify-center">
                <Button
                  onClick={handleClearAll}
                  variant="outline"
                  className="bg-red-500/10 border-red-500/30 text-red-300 hover:bg-red-500/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All History
                </Button>
              </div>
            )}
          </div>

          {/* History Items */}
          {filteredHistory.length === 0 ? (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
              <History className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">
                {searchQuery ? "No history items match your search." : "No prompt history yet."}
              </p>
            </Card>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {filteredHistory.map((item, index) => (
                <Card
                  key={item.id}
                  className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-400">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </p>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-purple-500/20 border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          Reuse
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-slate-300 mb-1">Original Prompt:</p>
                        <p className="text-white bg-white/5 p-3 rounded-lg">
                          {item.prompt}
                        </p>
                      </div>
                      
                      {item.enhanced && (
                        <>
                          <ArrowRight className="w-4 h-4 text-purple-400 mx-auto" />
                          <div>
                            <p className="text-sm text-slate-300 mb-1">Enhanced Result:</p>
                            <p className="text-white bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-3 rounded-lg border border-purple-500/20">
                              {item.enhanced}
                            </p>
                          </div>
                        </>
                      )}
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

export default PromptHistoryPage;
