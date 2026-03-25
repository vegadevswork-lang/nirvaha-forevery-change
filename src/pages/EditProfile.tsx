import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("Seeker");
  const [bio, setBio] = useState("On your journey to clarity");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your changes have been saved.",
    });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h1 className="font-display text-xl font-semibold text-foreground">Edit Profile</h1>
      </div>

      <div className="flex-1 px-4 space-y-6 pb-8">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.15), hsla(var(--sage) / 0.2))" }}
            >
              <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
                <circle cx="40" cy="28" r="12" stroke="hsl(var(--healing-green))" strokeWidth="1.5" opacity="0.7" />
                <path d="M20 65 C20 48 32 40 40 40 C48 40 60 48 60 65" stroke="hsl(var(--healing-green))" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </svg>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary"
              style={{ boxShadow: "0 2px 8px hsla(var(--healing-green) / 0.3)" }}
            >
              <Camera size={14} className="text-primary-foreground" />
            </motion.button>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="space-y-1.5">
            <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-card border-border/50 font-body"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Bio</label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="glass-card border-border/50 font-body min-h-[80px]"
              placeholder="A few words about your journey"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-card border-border/50 font-body"
              placeholder="your@email.com"
              type="email"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-body text-xs uppercase tracking-widest text-muted-foreground">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="glass-card border-border/50 font-body"
              placeholder="+1 (000) 000-0000"
              type="tel"
            />
          </div>
        </motion.div>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="w-full py-3.5 rounded-2xl font-body text-sm font-medium text-primary-foreground bg-primary"
          style={{ boxShadow: "0 4px 16px hsla(var(--healing-green) / 0.25)" }}
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  );
};

export default EditProfile;
