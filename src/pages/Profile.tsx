import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/home/BottomNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import JourneyCard from "@/components/profile/JourneyCard";
import PersonalStats from "@/components/profile/PersonalStats";
import SettingsSection from "@/components/profile/SettingsSection";
import { usePageLoading } from "@/hooks/use-page-loading";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const isLoading = usePageLoading(500);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div
      className="min-h-screen flex flex-col pb-24 bg-background"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 px-4 overflow-y-auto"
      >
        <ProfileHeader />
        <JourneyCard />
        <PersonalStats />
        <SettingsSection />

        {/* Journey continuity */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center font-display text-sm italic text-muted-foreground mb-6"
        >
          "Your space, your pace"
        </motion.p>
      </motion.div>

      <BottomNav active={activeTab} onSelect={setActiveTab} />
    </div>
  );
};

export default Profile;
