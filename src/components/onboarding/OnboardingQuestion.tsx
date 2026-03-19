import { useState } from "react";
import { motion } from "framer-motion";
import SparkleEffect from "./SparkleEffect";

interface Props {
  question: string;
  options: string[];
  microcopy: string[];
  onSelect: (index: number) => void;
}

const OnboardingQuestion = ({ question, options, microcopy, onSelect }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);
  const [showMicrocopy, setShowMicrocopy] = useState(false);

  const handleSelect = (index: number, e: React.MouseEvent) => {
    if (selected !== null) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setSparkleTrigger((t) => t + 1);
    setSelected(index);
    setShowMicrocopy(true);

    setTimeout(() => {
      onSelect(index);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-display text-2xl sm:text-3xl text-center text-foreground mb-8 leading-relaxed px-2"
      >
        {question}
      </motion.h2>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {options.map((option, i) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: "easeOut" }}
            onClick={(e) => handleSelect(i, e)}
            className={`
              glass-card px-5 py-4 text-left font-body text-sm sm:text-base
              transition-all duration-300 cursor-pointer
              ${selected === i
                ? "border-accent shadow-lg scale-[1.03]"
                : selected !== null
                  ? "opacity-40 scale-[0.97]"
                  : "hover:border-accent/50 hover:scale-[1.02] hover:shadow-md"
              }
            `}
            style={
              selected === i
                ? { boxShadow: "0 0 24px hsla(42, 60%, 72%, 0.3), 0 4px 16px hsla(152, 35%, 28%, 0.1)" }
                : undefined
            }
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showMicrocopy && selected !== null && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="font-display text-base italic text-muted-foreground mt-6 text-center"
        >
          {microcopy[selected]}
        </motion.p>
      )}
    </div>
  );
};

export default OnboardingQuestion;
