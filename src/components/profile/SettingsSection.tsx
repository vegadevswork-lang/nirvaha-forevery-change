import { motion } from "framer-motion";
import { User, Bell, Globe, Shield, HelpCircle, ChevronRight, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";

const settingsGroups = [
  {
    title: "Account",
    items: [
      { label: "Edit profile", icon: User, path: "/edit-profile" },
      { label: "Notifications", icon: Bell, path: "/notifications" },
      { label: "Language", icon: Globe, path: "/language" },
    ],
  },
  {
    title: "Privacy & Support",
    items: [
      { label: "Privacy & data", icon: Shield, path: "/privacy-data" },
      { label: "Help & support", icon: HelpCircle, path: "/help-support" },
    ],
  },
];

const SettingsSection = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="mx-1 space-y-4 mb-6"
    >
      {settingsGroups.map((group) => (
        <div key={group.title}>
          <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
            {group.title}
          </p>
          <div className="glass-card overflow-hidden divide-y divide-border/50">
            {group.items.map((item) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "hsla(var(--sage-light))",
                  }}
                >
                  <item.icon size={14} className="text-foreground" />
                </div>
                <span className="font-body text-sm text-foreground flex-1">{item.label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      {/* Dark mode toggle */}
      <div>
        <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
          Appearance
        </p>
        <div className="glass-card overflow-hidden">
          <div className="w-full flex items-center gap-3 px-4 py-3.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "hsla(var(--sage-light))" }}
            >
              {theme === "dark" ? <Moon size={14} className="text-foreground" /> : <Sun size={14} className="text-foreground" />}
            </div>
            <span className="font-body text-sm text-foreground flex-1">Dark mode</span>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </div>
      </div>


      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/chat")}
          className="flex-1 glass-card p-3.5 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.08), hsla(var(--gold) / 0.06))",
          }}
        >
          <span className="font-body text-sm text-primary font-medium">Talk to Nirvaha</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/journal")}
          className="flex-1 glass-card p-3.5 flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, hsla(var(--gold) / 0.08), hsla(var(--sage) / 0.06))",
          }}
        >
          <span className="font-body text-sm text-foreground font-medium">Write a journal</span>
        </motion.button>
      </div>

      {/* Logout */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate("/")}
        className="w-full flex items-center justify-center gap-2 py-3 mt-2"
      >
        <LogOut size={14} className="text-muted-foreground" />
        <span className="font-body text-sm text-muted-foreground">Log out</span>
      </motion.button>
    </motion.div>
  );
};

export default SettingsSection;
