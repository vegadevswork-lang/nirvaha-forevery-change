import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const notificationOptions = [
  {
    category: "Daily Reminders",
    items: [
      { key: "meditation", label: "Meditation reminder", description: "Gentle nudge to meditate daily", default: true },
      { key: "journal", label: "Journal prompt", description: "Evening reflection reminder", default: true },
      { key: "breathing", label: "Breathing exercise", description: "Midday mindfulness break", default: false },
    ],
  },
  {
    category: "Wellness Updates",
    items: [
      { key: "streak", label: "Streak milestones", description: "Celebrate your consistency", default: true },
      { key: "insights", label: "Weekly insights", description: "Your wellness summary every Sunday", default: true },
      { key: "tips", label: "Wisdom tips", description: "Ancient wisdom for modern life", default: false },
    ],
  },
  {
    category: "Community",
    items: [
      { key: "newFeatures", label: "New features", description: "Stay updated on Nirvaha improvements", default: true },
      { key: "events", label: "Live sessions & events", description: "Group meditation and workshops", default: false },
    ],
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    notificationOptions.forEach((group) =>
      group.items.forEach((item) => (initial[item.key] = item.default))
    );
    return initial;
  });

  const toggle = (key: string) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h1 className="font-display text-xl font-semibold text-foreground">Notifications</h1>
      </div>

      <div className="flex-1 px-4 space-y-5 pb-8">
        {notificationOptions.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.1 }}
          >
            <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
              {group.category}
            </p>
            <div className="glass-card overflow-hidden divide-y divide-border/50">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex-1 mr-3">
                    <p className="font-body text-sm text-foreground">{item.label}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <Switch checked={settings[item.key]} onCheckedChange={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
