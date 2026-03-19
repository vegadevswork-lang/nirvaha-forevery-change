import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import nirvahaLogo from "@/assets/nirvaha-logo.png";
import Particles from "@/components/Particles";
import OnboardingQuestion from "@/components/onboarding/OnboardingQuestion";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import { questions } from "@/components/onboarding/onboardingData";

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const navigate = useNavigate();
  const isComplete = step >= questions.length;
  const current = questions[step];

  const handleSelect = (optionIndex: number) => {
    setAnswers((prev) => [...prev, optionIndex]);
    if (step + 1 >= questions.length) {
      // Navigate to home after last question
      setTimeout(() => navigate("/home"), 800);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 overflow-hidden bg-background">
      {/* Particles */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 300, height: 300, top: "8%", left: "3%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 240, height: 240, bottom: "8%", right: "5%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {/* Logo */}
        {!isComplete && (
          <motion.img
            src={nirvahaLogo}
            alt="Nirvaha"
            className="h-12 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Progress label */}
        {!isComplete && current && (
          <motion.div
            key={current.progressLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2"
          >
            <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
              {current.progressLabel}
            </span>
          </motion.div>
        )}

        {/* Stepper */}
        {!isComplete && (
          <OnboardingStepper currentStep={step} totalSteps={questions.length} />
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          {!isComplete && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <OnboardingQuestion
                question={current.question}
                options={current.options}
                microcopy={current.microcopy}
                onSelect={handleSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
