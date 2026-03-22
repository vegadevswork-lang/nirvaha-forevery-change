import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const IntroVideo = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const handleEnd = () => {
    setEnded(true);
    setTimeout(() => navigate("/auth"), 600);
  };

  const handleSkip = () => {
    if (videoRef.current) videoRef.current.pause();
    setEnded(true);
    setTimeout(() => navigate("/auth"), 300);
  };

  return (
    <AnimatePresence>
      {!ended ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-[#F8F5EF] flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src="/videos/nirvaha-intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={handleEnd}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleSkip}
            className="absolute bottom-10 right-6 font-body text-sm tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300 uppercase"
          >
            Skip
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroVideo;
