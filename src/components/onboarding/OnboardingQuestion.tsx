import { useState } from "react";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import type { OnboardingOption } from "./onboardingData";

interface Props {
  question: string;
  subtitle?: string;
  options: OnboardingOption[];
  onSelect: (index: number) => void;
}

const OnboardingQuestion = ({ question, subtitle, options, onSelect }: Props) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggleOption = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const handleContinue = () => {
    // Send the first selected option (or 0 if somehow none)
    const first = selected.size > 0 ? [...selected][0] : 0;
    onSelect(first);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-[70dvh] justify-between">
      <div className="w-full flex flex-col items-center">
        {/* Question */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-[1.65rem] sm:text-3xl text-center text-foreground mb-2 leading-tight font-semibold"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
        >
          {question}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-body text-sm text-muted-foreground mb-8 text-center"
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Options */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {options.map((opt, i) => {
            const isSelected = selected.has(i);
            return (
              <motion.button
                key={opt.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * i }}
                onClick={() => toggleOption(i)}
                className="w-full px-6 py-4 rounded-2xl text-center font-body text-[15px] font-medium transition-all duration-200 cursor-pointer border"
                style={{
                  background: isSelected
                    ? "hsla(40 33% 96% / 0.95)"
                    : "hsla(0 0% 0% / 0.45)",
                  color: isSelected
                    ? "hsl(150 25% 18%)"
                    : "hsla(40 33% 96% / 0.95)",
                  borderColor: isSelected
                    ? "hsla(42 60% 72% / 0.8)"
                    : "hsla(40 33% 96% / 0.25)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: isSelected
                    ? "0 4px 20px hsla(42 60% 72% / 0.3)"
                    : "0 2px 8px hsla(0 0% 0% / 0.3)",
                }}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </div>

        {/* Helper text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-body text-xs text-muted-foreground/70 mt-5 text-center"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
        >
          Your selections won't limit access to any features.
        </motion.p>
      </div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: selected.size > 0 ? 1 : 0.4, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 mb-4 w-full flex justify-center"
      >
        <InteractiveHoverButton
          onClick={handleContinue}
          disabled={selected.size === 0}
          variant="default"
          hoverContent="Next →"
          className="px-10 h-12 rounded-full text-base"
        >
          Continue
        </InteractiveHoverButton>
      </motion.div>
    </div>
  );
};

export default OnboardingQuestion;
