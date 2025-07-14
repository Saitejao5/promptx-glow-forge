
import { useState, useEffect } from "react";

export interface SavedPrompt {
  id: string;
  originalPrompt: string;
  enhancedPrompt: string;
  title: string;
  tags: string[];
  timestamp: number;
  isPinned: boolean;
}

export const useSavedPrompts = () => {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("promptx-saved");
    if (saved) {
      try {
        setSavedPrompts(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved prompts:", error);
      }
    }
  }, []);

  const savePrompt = (originalPrompt: string, enhancedPrompt: string, title?: string) => {
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      originalPrompt,
      enhancedPrompt,
      title: title || originalPrompt.slice(0, 50) + "...",
      tags: ["⏱ Recent"],
      timestamp: Date.now(),
      isPinned: false,
    };

    const updatedPrompts = [newPrompt, ...savedPrompts];
    setSavedPrompts(updatedPrompts);
    localStorage.setItem("promptx-saved", JSON.stringify(updatedPrompts));
    return newPrompt.id;
  };

  const deletePrompt = (id: string) => {
    const updatedPrompts = savedPrompts.filter(prompt => prompt.id !== id);
    setSavedPrompts(updatedPrompts);
    localStorage.setItem("promptx-saved", JSON.stringify(updatedPrompts));
  };

  const togglePin = (id: string) => {
    const updatedPrompts = savedPrompts.map(prompt => {
      if (prompt.id === id) {
        const isPinned = !prompt.isPinned;
        const tags = isPinned 
          ? ["📌 Pinned", ...prompt.tags.filter(tag => tag !== "📌 Pinned")]
          : prompt.tags.filter(tag => tag !== "📌 Pinned");
        return { ...prompt, isPinned, tags };
      }
      return prompt;
    });
    setSavedPrompts(updatedPrompts);
    localStorage.setItem("promptx-saved", JSON.stringify(updatedPrompts));
  };

  const updatePrompt = (id: string, updates: Partial<SavedPrompt>) => {
    const updatedPrompts = savedPrompts.map(prompt => 
      prompt.id === id ? { ...prompt, ...updates } : prompt
    );
    setSavedPrompts(updatedPrompts);
    localStorage.setItem("promptx-saved", JSON.stringify(updatedPrompts));
  };

  return {
    savedPrompts,
    savePrompt,
    deletePrompt,
    togglePin,
    updatePrompt,
  };
};
