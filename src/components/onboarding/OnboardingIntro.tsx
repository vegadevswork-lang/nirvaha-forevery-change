import { motion } from "framer-motion";
import nirvahaLogo from "@/assets/nirvaha-logo.png";
import introIllustration from "@/assets/onboarding-meditation.png";

interface Props {
  onBegin: () => void;
}

const OnboardingIntro = ({ onBegin }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center text-center px-6 w-full max-w-sm mx-auto"
      style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.4)" }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-4"
      >
        <motion.img
          src={nirvahaLogo}
          alt="Nirvaha"
          className="h-14 mx-auto"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Illustration */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative mb-6"
      >
        <motion.img
          src={introIllustration}
          alt="Meditation"
          className="w-48 h-48 mx-auto object-contain"
          width={512}
          height={512}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Glow behind illustration */}
        <div
          className="absolute inset-0 -z-10 rounded-full mx-auto"
          style={{
            width: "80%",
            height: "80%",
            top: "10%",
            left: "10%",
            background: "radial-gradient(circle, hsl(45 90% 55% / 0.6) 0%, hsl(45 90% 50% / 0.3) 40%, transparent 70%)",
            filter: "blur(20px)",
            animation: "pulse-soft 3s ease-in-out infinite",
          }}
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="font-display text-3xl sm:text-4xl text-foreground mb-3 font-semibold leading-tight"
      >
        Hi there!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="font-display text-lg text-muted-foreground mb-1"
      >
        Before you start, we have
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="font-display text-lg text-muted-foreground mb-10"
      >
        just a few questions
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        onClick={onBegin}
        className="btn-primary max-w-xs text-base tracking-wide"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        BEGIN
      </motion.button>
    </motion.div>
  );
};

export default OnboardingIntro;
