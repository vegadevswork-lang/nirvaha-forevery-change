import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy-loaded pages for code splitting
const Index = lazy(() => import("./pages/Index.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Onboarding = lazy(() => import("./pages/Onboarding.tsx"));
const Home = lazy(() => import("./pages/Home.tsx"));
const Chat = lazy(() => import("./pages/Chat.tsx"));
const Wellness = lazy(() => import("./pages/Wellness.tsx"));
const LegendsSelfie = lazy(() => import("./pages/LegendsSelfie.tsx"));
const Profile = lazy(() => import("./pages/Profile.tsx"));
const Journal = lazy(() => import("./pages/Journal.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const EditProfile = lazy(() => import("./pages/EditProfile.tsx"));
const Notifications = lazy(() => import("./pages/Notifications.tsx"));
const Language = lazy(() => import("./pages/Language.tsx"));
const PrivacyData = lazy(() => import("./pages/PrivacyData.tsx"));
const HelpSupport = lazy(() => import("./pages/HelpSupport.tsx"));
const CompanionHub = lazy(() => import("./pages/CompanionHub.tsx"));
const MentorProfile = lazy(() => import("./pages/MentorProfile.tsx"));
const BookSession = lazy(() => import("./pages/BookSession.tsx"));
const BecomeCompanion = lazy(() => import("./pages/BecomeCompanion.tsx"));
const SessionFeedback = lazy(() => import("./pages/SessionFeedback.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
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
            <Route path="/companion" element={<CompanionHub />} />
            <Route path="/companion/mentor/:id" element={<MentorProfile />} />
            <Route path="/companion/feedback/:id" element={<SessionFeedback />} />
            <Route path="/companion/book/:id" element={<BookSession />} />
            <Route path="/become-companion" element={<BecomeCompanion />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
