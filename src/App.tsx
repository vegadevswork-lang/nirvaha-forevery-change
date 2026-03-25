import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import Onboarding from "./pages/Onboarding.tsx";
import Home from "./pages/Home.tsx";
import Chat from "./pages/Chat.tsx";
import Wellness from "./pages/Wellness.tsx";
import LegendsSelfie from "./pages/LegendsSelfie.tsx";
import Profile from "./pages/Profile.tsx";
import Journal from "./pages/Journal.tsx";
import NotFound from "./pages/NotFound.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import Notifications from "./pages/Notifications.tsx";
import Language from "./pages/Language.tsx";
import PrivacyData from "./pages/PrivacyData.tsx";
import HelpSupport from "./pages/HelpSupport.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wellness" element={<Wellness />} />
          <Route path="/legends-selfie" element={<LegendsSelfie />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/language" element={<Language />} />
          <Route path="/privacy-data" element={<PrivacyData />} />
          <Route path="/help-support" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
