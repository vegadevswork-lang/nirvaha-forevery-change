import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import nirvahaLogo from "@/assets/nirvaha-logo.png";
import Particles from "@/components/Particles";

import OnboardingIntro from "@/components/onboarding/OnboardingIntro";
import OnboardingQuestion from "@/components/onboarding/OnboardingQuestion";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import OnboardingRecap from "@/components/onboarding/OnboardingRecap";
import { questions } from "@/components/onboarding/onboardingData";

type Phase = "intro" | "questions" | "recap";

const Onboarding = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const current = questions[step];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slow down video & smooth loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 0.6;

    const handleTimeUpdate = () => {
      if (video.duration && video.currentTime >= video.duration - 0.5) {
        video.style.opacity = "0";
        setTimeout(() => {
          video.currentTime = 0;
          video.play();
          video.style.opacity = "1";
        }, 400);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const handleBegin = () => setPhase("questions");

  const handleSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    if (step + 1 >= questions.length) {
      setPhase("recap");
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (phase === "recap") {
      setPhase("questions");
      setStep(questions.length - 1);
      setAnswers((prev) => prev.slice(0, -1));
    } else if (phase === "questions" && step > 0) {
      setStep((s) => s - 1);
      setAnswers((prev) => prev.slice(0, -1));
    } else if (phase === "questions" && step === 0) {
      setPhase("intro");
    }
  };

  const showBack = phase === "questions" || phase === "recap";

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/onboarding-bg-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.5) saturate(1.3)",
            willChange: "transform",
          }}
        >
          <source src="/videos/onboarding-bg-hd.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-black/15" />

        {/* Subtle particle overlay */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{ opacity: 0.4 }}>
          <Particles
            particleColors={["#ffffff", "#d4f0e0"]}
            particleCount={50}
            particleSpread={8}
            speed={0.03}
            particleBaseSize={40}
            moveParticlesOnHover={false}
            alphaParticles
            disableRotation
            pixelRatio={1}
          />
        </div>
      </div>

      {/* Back button */}
      <AnimatePresence>
        {showBack && (
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            onClick={handleBack}
            className="absolute top-6 left-4 z-20 glass-card p-2.5 rounded-full hover:scale-105 transition-transform"
            aria-label="Go back"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <OnboardingIntro onBegin={handleBegin} />
            </motion.div>
          )}

          {phase === "questions" && current && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex flex-col items-center"
            >
              <motion.img
                src={nirvahaLogo}
                alt="Nirvaha"
                className="h-10 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2"
              >
                {current.progressLabel}
              </motion.span>

              <OnboardingStepper currentStep={step} totalSteps={questions.length} />

              <OnboardingQuestion
                question={current.question}
                subtitle={current.subtitle}
                options={current.options}
                layout={current.layout}
                onSelect={handleSelect}
              />
            </motion.div>
          )}

          {phase === "recap" && (
            <motion.div
              key="recap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <OnboardingRecap answers={answers} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
