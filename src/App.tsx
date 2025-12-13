import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const History = lazy(() => import("./pages/History"));
const Programs = lazy(() => import("./pages/Programs"));
const Membership = lazy(() => import("./pages/Membership"));
const PorterRegistration = lazy(() => import("./pages/membership/PorterRegistration"));
const CorporateRegistration = lazy(() => import("./pages/membership/CorporateRegistration"));
const HonoraryRegistration = lazy(() => import("./pages/membership/HonoraryRegistration"));
const Partners = lazy(() => import("./pages/Partners"));
const News = lazy(() => import("./pages/News"));
const Stories = lazy(() => import("./pages/Stories"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Podcast = lazy(() => import("./pages/Podcast"));
const PorterChat = lazy(() => import("./pages/PorterChat"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const MemberAuth = lazy(() => import("./pages/MemberAuth"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const PorterDirectory = lazy(() => import("./pages/PorterDirectory"));
const PorterProfile = lazy(() => import("./pages/PorterProfile"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
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
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/porter-chat" element={<PorterChat />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/member-auth" element={<MemberAuth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/porters" element={<PorterDirectory />} />
            <Route path="/porters/:id" element={<PorterProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
