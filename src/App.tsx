import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import History from "./pages/History";
import Programs from "./pages/Programs";
import Membership from "./pages/Membership";
import PorterRegistration from "./pages/membership/PorterRegistration";
import CorporateRegistration from "./pages/membership/CorporateRegistration";
import HonoraryRegistration from "./pages/membership/HonoraryRegistration";
import Partners from "./pages/Partners";
import News from "./pages/News";
import Stories from "./pages/Stories";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/AdminDashboard";
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
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/porter" element={<PorterRegistration />} />
          <Route path="/membership/corporate" element={<CorporateRegistration />} />
          <Route path="/membership/honorary" element={<HonoraryRegistration />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/news" element={<News />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;