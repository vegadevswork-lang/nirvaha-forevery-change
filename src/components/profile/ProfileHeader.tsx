import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useState } from "react";

const ProfileHeader = () => {
  const [name] = useState("Seeker");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center pt-8 pb-6"
    >
      {/* Avatar with aura ring */}
      <motion.div
        className="relative mb-4"
        whileTap={{ scale: 0.95 }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute -inset-2 rounded-full animate-pulse-soft"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.2), hsla(var(--gold) / 0.15))",
          }}
        />
        {/* Inner gradient ring */}
        <div
          className="absolute -inset-1 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--gold)))",
            opacity: 0.3,
          }}
        />
        {/* Avatar circle */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--sage) / 0.2))",
          }}
        >
          {/* Abstract line art avatar */}
          <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
            <circle cx="40" cy="28" r="12" stroke="hsl(var(--healing-green))" strokeWidth="1.5" opacity="0.7" />
            <path
              d="M20 65 C20 48 32 40 40 40 C48 40 60 48 60 65"
              stroke="hsl(var(--healing-green))"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
            <circle cx="40" cy="28" r="4" fill="hsl(var(--sage))" opacity="0.4" />
          </svg>
          {/* Camera overlay */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-1 right-1 w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background: "hsl(var(--primary))",
              boxShadow: "0 2px 8px hsla(var(--healing-green) / 0.3)",
            }}
          >
            <Camera size={12} className="text-primary-foreground" />
          </motion.button>
        </div>
      </motion.div>

      {/* Name */}
      <h1 className="font-display text-2xl font-semibold text-foreground">{name}</h1>
      <p className="font-body text-sm text-muted-foreground mt-1">On your journey to clarity</p>
    </motion.div>
  );
};

export default ProfileHeader;
