
import { useState, useEffect } from "react";

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: number;
  enhanced?: string;
}

export const usePromptHistory = () => {
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("promptx-history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse prompt history:", error);
      }
    }
  }, []);

  const addToHistory = (prompt: string, enhanced?: string) => {
    const newItem: PromptHistoryItem = {
      id: Date.now().toString(),
      prompt,
      timestamp: Date.now(),
      enhanced,
    };

    const updatedHistory = [newItem, ...history.slice(0, 9)]; // Keep only 10 items
    setHistory(updatedHistory);
    localStorage.setItem("promptx-history", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("promptx-history");
  };

  const removeFromHistory = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("promptx-history", JSON.stringify(updatedHistory));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
  };
};
