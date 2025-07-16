import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Home, FileText, Save, History, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  const menuItems = [
    { id: "new-chat", icon: Home, label: "New Chat", emoji: "🏠" },
    { id: "templates", icon: FileText, label: "Templates", emoji: "🧩" },
    { id: "saved", icon: Save, label: "Saved", emoji: "💾" },
    { id: "history", icon: History, label: "History", emoji: "🕘" },
    { id: "about", icon: Info, label: "About Us", emoji: "🧠" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-white/5 backdrop-blur-xl border-r border-white/10 z-50 transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Menu</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer p-4 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-white font-medium">{item.label}</h3>
                      <p className="text-slate-400 text-sm">
                        {item.id === "new-chat" && "Start a fresh conversation"}
                        {item.id === "templates" && "Browse prompt templates"}
                        {item.id === "saved" && "Your saved prompts"}
                        {item.id === "history" && "Previous conversations"}
                        {item.id === "about" && "Learn more about PromptX"}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10">
            <p className="text-slate-500 text-sm text-center">
              Powered by advanced AI • Built for professionals
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
