import { motion } from "framer-motion";
import { Heart, Brain, Compass, Sparkles, Clock } from "lucide-react";

const stepIcons = [Heart, Brain, Compass, Sparkles, Clock];
const stepLabels = ["Heart", "Mind", "Seeking", "Path", "Time"];

interface OnboardingStepperProps {
  currentStep: number;
  totalSteps: number;
}

const OnboardingStepper = ({ currentStep, totalSteps }: OnboardingStepperProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 mb-8 w-full max-w-sm mx-auto">
      {Array.from({ length: totalSteps }, (_, i) => {
        const Icon = stepIcons[i];
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={i} className="flex items-center flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`
                relative flex flex-col items-center gap-1 flex-1
              `}
            >
              {/* Icon circle */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive
                    ? "0 0 16px hsla(42, 60%, 72%, 0.4)"
                    : "none",
                }}
                className={`
                  w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500
                  ${isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-accent text-accent-foreground border-2 border-accent"
                      : "bg-muted text-muted-foreground"
                  }
                `}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>

              {/* Label */}
              <span
                className={`text-[10px] font-body tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-accent-foreground font-medium"
                    : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {stepLabels[i]}
              </span>

              {/* Progress bar below */}
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: isCompleted ? "100%" : isActive ? "50%" : "0%",
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ background: isCompleted ? "hsl(var(--primary))" : "hsl(var(--accent))" }}
                />
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};

export default OnboardingStepper;
