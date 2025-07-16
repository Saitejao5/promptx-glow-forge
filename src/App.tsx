
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatInterface from "./pages/ChatInterface";
import SavedPrompts from "./pages/SavedPrompts";
import PromptHistoryPage from "./pages/PromptHistory";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatInterface />} />
          <Route path="/templates" element={<ChatInterface />} />
          <Route path="/saved" element={<SavedPrompts />} />
          <Route path="/history" element={<PromptHistoryPage />} />
          <Route path="/tools" element={<ChatInterface />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
