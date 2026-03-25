import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
];

const Language = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selected, setSelected] = useState("en");

  const handleSelect = (code: string) => {
    setSelected(code);
    const lang = languages.find((l) => l.code === code);
    toast({
      title: "Language updated",
      description: `Nirvaha is now set to ${lang?.label}`,
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--cream-warm)) 40%, hsl(var(--sage-light)) 100%)",
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h1 className="font-display text-xl font-semibold text-foreground">Language</h1>
      </div>

      <p className="px-5 font-body text-xs text-muted-foreground mb-4">
        Choose the language for your Nirvaha experience. Wisdom transcends words.
      </p>

      <div className="flex-1 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card overflow-hidden divide-y divide-border/50"
        >
          {languages.map((lang) => (
            <motion.button
              key={lang.code}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(lang.code)}
              className="w-full flex items-center justify-between px-4 py-3.5 text-left"
            >
              <div>
                <p className="font-body text-sm text-foreground">{lang.label}</p>
                <p className="font-body text-xs text-muted-foreground">{lang.native}</p>
              </div>
              {selected === lang.code && (
                <Check size={16} className="text-primary" />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Language;
