import { motion } from "framer-motion";
import nirvahaLogo from "@/assets/nirvaha-logo.png";

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
    >
      {/* Logo with breathing animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <motion.img
          src={nirvahaLogo}
          alt="Nirvaha"
          className="h-16 mx-auto"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Decorative orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="w-40 h-40 rounded-full mb-8 mx-auto"
        style={{
          background: "radial-gradient(circle, hsl(var(--gold)) 0%, hsl(var(--healing-green)) 50%, transparent 100%)",
          filter: "blur(30px)",
        }}
      />

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
        className="font-display text-lg text-muted-foreground mb-2"
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
