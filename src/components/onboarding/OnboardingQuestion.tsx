import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SparkleEffect from "./SparkleEffect";
import type { OnboardingOption } from "./onboardingData";

interface Props {
  question: string;
  subtitle?: string;
  options: OnboardingOption[];
  layout: "grid" | "list" | "pills";
  onSelect: (index: number) => void;
}

const OnboardingQuestion = ({ question, subtitle, options, layout, onSelect }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [sparkleOrigin, setSparkleOrigin] = useState<{ x: number; y: number } | null>(null);
  const [sparkleTrigger, setSparkleTrigger] = useState(0);

  const handleSelect = (index: number, e: React.MouseEvent) => {
    if (selected !== null) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparkleOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setSparkleTrigger((t) => t + 1);
    setSelected(index);
    setTimeout(() => onSelect(index), 1400);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <SparkleEffect origin={sparkleOrigin} trigger={sparkleTrigger} />

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display text-2xl sm:text-3xl text-center text-foreground mb-1 leading-relaxed px-2 font-semibold"
      >
        {question}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-sm text-muted-foreground mb-6 text-center"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Grid layout */}
      {layout === "grid" && (
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {options.map((opt, i) => (
            <GridCard
              key={opt.label}
              opt={opt}
              index={i}
              selected={selected}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {/* List layout */}
      {layout === "list" && (
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {options.map((opt, i) => (
            <ListCard
              key={opt.label}
              opt={opt}
              index={i}
              selected={selected}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {/* Pills layout */}
      {layout === "pills" && (
        <div className="flex flex-wrap gap-3 justify-center w-full max-w-sm">
          {options.map((opt, i) => (
            <PillCard
              key={opt.label}
              opt={opt}
              index={i}
              selected={selected}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {/* Expanded description for selected */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 glass-card px-5 py-4 w-full max-w-sm text-center"
          >
            <p className="font-body text-sm text-foreground leading-relaxed">
              {options[selected].description}
            </p>
            <p className="font-display text-xs italic text-muted-foreground mt-2">
              {options[selected].microcopy}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* Grid Card */
function GridCard({ opt, index, selected, onSelect }: {
  opt: OnboardingOption; index: number; selected: number | null;
  onSelect: (i: number, e: React.MouseEvent) => void;
}) {
  const isSelected = selected === index;
  const isOther = selected !== null && !isSelected;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.08 * index, ease: "easeOut" }}
      onClick={(e) => onSelect(index, e)}
      className={`
        glass-card p-4 flex flex-col items-center gap-2 text-center cursor-pointer
        transition-all duration-300 relative overflow-hidden
        ${isSelected
          ? "border-accent ring-2 ring-accent/30 scale-[1.04]"
          : isOther
            ? "opacity-30 scale-[0.95]"
            : "hover:border-accent/40 hover:scale-[1.03] hover:shadow-md"
        }
      `}
    >
      <motion.span
        className="text-3xl"
        animate={isSelected ? { scale: [1, 1.3, 1.1], rotate: [0, 10, -5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {opt.icon}
      </motion.span>
      <span className="font-body text-sm font-medium text-foreground leading-tight">
        {opt.label}
      </span>
      {isSelected && (
        <motion.div
          layoutId="selected-glow"
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: "radial-gradient(circle at center, hsla(var(--gold) / 0.15) 0%, transparent 70%)",
          }}
        />
      )}
    </motion.button>
  );
}

/* List Card */
function ListCard({ opt, index, selected, onSelect }: {
  opt: OnboardingOption; index: number; selected: number | null;
  onSelect: (i: number, e: React.MouseEvent) => void;
}) {
  const isSelected = selected === index;
  const isOther = selected !== null && !isSelected;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.06 * index }}
      onClick={(e) => onSelect(index, e)}
      className={`
        glass-card px-5 py-4 text-left flex items-center gap-4 cursor-pointer
        transition-all duration-300
        ${isSelected
          ? "border-accent ring-2 ring-accent/30 scale-[1.02]"
          : isOther
            ? "opacity-30 scale-[0.97]"
            : "hover:border-accent/40 hover:scale-[1.01]"
        }
      `}
    >
      <motion.span
        className="text-2xl flex-shrink-0"
        animate={isSelected ? { scale: [1, 1.3, 1.1] } : {}}
      >
        {opt.icon}
      </motion.span>
      <div>
        <span className="font-body text-sm font-medium text-foreground">{opt.label}</span>
        <p className="font-body text-xs text-muted-foreground mt-0.5">{opt.description}</p>
      </div>
    </motion.button>
  );
}

/* Pill Card */
function PillCard({ opt, index, selected, onSelect }: {
  opt: OnboardingOption; index: number; selected: number | null;
  onSelect: (i: number, e: React.MouseEvent) => void;
}) {
  const isSelected = selected === index;
  const isOther = selected !== null && !isSelected;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      onClick={(e) => onSelect(index, e)}
      className={`
        glass-card px-6 py-4 flex flex-col items-center gap-1 cursor-pointer min-w-[120px]
        transition-all duration-300
        ${isSelected
          ? "border-accent ring-2 ring-accent/30 scale-[1.05]"
          : isOther
            ? "opacity-30 scale-[0.95]"
            : "hover:border-accent/40 hover:scale-[1.03]"
        }
      `}
    >
      <span className="text-xl">{opt.icon}</span>
      <span className="font-body text-sm font-medium text-foreground">{opt.label}</span>
    </motion.button>
  );
}

export default OnboardingQuestion;
