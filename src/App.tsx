
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
import KnowledgeBase from "./pages/KnowledgeBase";
import ContentSuggestion from "./pages/ContentSuggestion";
import ScriptBuilder from "./pages/ScriptBuilder";
import ContentAnalyser from "./pages/ContentAnalyser";
import ContentAnalysisResult from "./pages/ContentAnalysisResult";
import ViralReelCutter from "./pages/ViralReelCutter";
import ViralReelResults from "./pages/ViralReelResults";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import BonusFeatures from "./pages/BonusFeatures";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/batch-transcribe" element={<BatchTranscribe />} />
          <Route path="/hinglish-transcribe" element={<HinglishTranscribe />} />
          <Route path="/knowledge-bot" element={<KnowledgeBot />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/content-suggestion" element={<ContentSuggestion />} />
          <Route path="/script-builder" element={<ScriptBuilder />} />
          <Route path="/content-analyser" element={<ContentAnalyser />} />
          <Route path="/content-analysis-result" element={<ContentAnalysisResult />} />
          <Route path="/viral-reel-cutter" element={<ViralReelCutter />} />
          <Route path="/viral-reel-results" element={<ViralReelResults />} />
          <Route path="/bonus-features" element={<BonusFeatures />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
