import { motion } from "framer-motion";

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingStepper = ({ currentStep, totalSteps }: OnboardingStepperProps) => {
  return (
    <div className="flex items-center gap-2 mb-8 w-full max-w-xs mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-muted">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: isCompleted ? "100%" : isActive ? "50%" : "0%",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                background: isCompleted
                  ? "hsl(var(--primary))"
                  : "hsl(var(--accent))",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingStepper;
