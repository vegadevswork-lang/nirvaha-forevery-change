import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const OnboardingComplete = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center justify-center text-center px-6"
    >
      {/* Glowing orb */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-32 h-32 rounded-full mb-8"
        style={{
          background: "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--healing-green)) 60%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-display text-3xl sm:text-4xl text-foreground mb-3"
      >
        We're creating your personal space…
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="font-body text-muted-foreground text-base mb-10 max-w-xs"
      >
        This is your space to understand yourself.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <InteractiveHoverButton
          onClick={() => navigate("/")}
          variant="default"
          hoverContent="Step inside →"
          className="w-full max-w-xs h-12 rounded-2xl"
        >
          Enter Nirvaha
        </InteractiveHoverButton>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingComplete;
