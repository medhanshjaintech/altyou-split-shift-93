
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BatchTranscribe from "./pages/BatchTranscribe";
import HinglishTranscribe from "./pages/HinglishTranscribe";
import KnowledgeBot from "./pages/KnowledgeBot";
import ContentSuggestion from "./pages/ContentSuggestion";
import ScriptBuilder from "./pages/ScriptBuilder";
import ContentAnalyser from "./pages/ContentAnalyser";
import ContentAnalysisResult from "./pages/ContentAnalysisResult";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/batch-transcribe" element={<BatchTranscribe />} />
          <Route path="/hinglish-transcribe" element={<HinglishTranscribe />} />
          <Route path="/knowledge-bot" element={<KnowledgeBot />} />
          <Route path="/content-suggestion" element={<ContentSuggestion />} />
          <Route path="/script-builder" element={<ScriptBuilder />} />
          <Route path="/content-analyser" element={<ContentAnalyser />} />
          <Route path="/content-analysis-result" element={<ContentAnalysisResult />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
