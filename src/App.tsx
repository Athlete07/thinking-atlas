import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssessmentProvider } from "@/context/AssessmentContext";
import Welcome from "./pages/Welcome";
import Instructions from "./pages/Instructions";
import Decoder from "./pages/games/Decoder";
import Verbal from "./pages/games/Verbal";
import Quantitative from "./pages/games/Quantitative";
import Spatial from "./pages/games/Spatial";
import Attention from "./pages/games/Attention";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AssessmentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/instructions" element={<Instructions />} />
            <Route path="/game/decoder" element={<Decoder />} />
            <Route path="/game/verbal" element={<Verbal />} />
            <Route path="/game/quantitative" element={<Quantitative />} />
            <Route path="/game/spatial" element={<Spatial />} />
            <Route path="/game/attention" element={<Attention />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AssessmentProvider>
  </QueryClientProvider>
);

export default App;
