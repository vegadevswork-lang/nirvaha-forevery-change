import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
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

  const handleSkip = () => {
    setPhase("recap");
    // Fill remaining answers with 0
    const remaining = questions.length - answers.length;
    setAnswers((prev) => [...prev, ...Array(remaining).fill(0)]);
  };

  const showBack = phase === "questions" || phase === "recap";
  const showSkip = phase === "questions";

  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-black">
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

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />
        <div className="absolute inset-0 bg-black/15" />

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
            className="absolute top-6 left-4 z-20 p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft size={22} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleSkip}
            className="absolute top-7 right-5 z-20 font-body text-sm font-semibold text-white/90 hover:text-white transition-colors"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
          >
            Skip
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center flex-1 pt-16">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 flex items-center"
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
              className="w-full flex flex-col items-center flex-1"
            >
              {/* Progress bar */}
              <OnboardingStepper currentStep={step} totalSteps={questions.length} />

              <OnboardingQuestion
                question={current.question}
                subtitle={current.subtitle}
                options={current.options}
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
              className="w-full flex-1 flex items-center"
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
