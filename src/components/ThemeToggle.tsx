import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Theme toggle logic would go here
    // For now, we'll keep the dark theme as it's the main design
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
    >
      <div className="relative w-5 h-5">
        <Sun className={`absolute inset-0 w-5 h-5 text-yellow-400 transition-all duration-300 ${
          isDark ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
        }`} />
        <Moon className={`absolute inset-0 w-5 h-5 text-slate-300 transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-180'
        }`} />
      </div>
    </Button>
  );
};

export default ThemeToggle;
