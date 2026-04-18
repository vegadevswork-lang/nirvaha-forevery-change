import { motion } from "framer-motion";

interface EmotionDef {
  label: string;
  color: string;
  shape: "circle" | "flower" | "blob" | "square" | "arch" | "hex" | "triangle" | "rounded-sq";
  face: "happy" | "serene" | "smile" | "sleepy" | "worried" | "spiral" | "bored" | "stressed" | "angry" | "side-eye" | "hurt" | "guilty";
}

const emotions: EmotionDef[] = [
  { label: "Excited", color: "330 70% 75%", shape: "circle", face: "happy" },
  { label: "Joyful", color: "330 80% 68%", shape: "flower", face: "serene" },
  { label: "Grateful", color: "270 40% 68%", shape: "blob", face: "smile" },
  { label: "Calm", color: "270 35% 72%", shape: "square", face: "sleepy" },
  { label: "Sensitive", color: "200 85% 60%", shape: "arch", face: "worried" },
  { label: "Confused", color: "220 70% 55%", shape: "hex", face: "spiral" },
  { label: "Bored", color: "150 55% 35%", shape: "circle", face: "bored" },
  { label: "Stressed", color: "150 50% 40%", shape: "triangle", face: "stressed" },
  { label: "Angry", color: "15 80% 55%", shape: "rounded-sq", face: "angry" },
  { label: "Insecure", color: "20 85% 55%", shape: "circle", face: "side-eye" },
  { label: "Hurt", color: "35 80% 60%", shape: "blob", face: "hurt" },
  { label: "Guilty", color: "40 85% 58%", shape: "square", face: "guilty" },
];

const getFaceSvg = (face: EmotionDef["face"]) => {
  switch (face) {
    case "happy":
      return (
        <>
          <path d="M16 18 C16 18 18 14 22 14 C26 14 28 18 28 18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
          <path d="M14 22 C14 22 18 28 22 28 C26 28 30 22 30 22" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        </>
      );
    case "serene":
      return (
        <>
          <path d="M15 19 C15 19 17 16 20 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M29 19 C29 19 27 16 24 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M17 25 C17 25 20 28 27 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "smile":
      return (
        <>
          <path d="M15 19 C15 19 17 16 20 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M29 19 C29 19 27 16 24 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M16 24 C16 24 19 28 22 28 C25 28 28 24 28 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "sleepy":
      return (
        <>
          <path d="M15 19 C15 19 17 16 20 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M29 19 C29 19 27 16 24 16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M18 25 C18 25 20 27 22 27 C24 27 26 25 26 25" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "worried":
      return (
        <>
          <line x1="16" y1="17" x2="20" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="28" y1="17" x2="24" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 26 C18 26 20 24 22 24 C24 24 26 26 26 26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "spiral":
      return (
        <>
          <circle cx="17" cy="20" r="3" fill="currentColor" opacity="0.8" />
          <circle cx="17" cy="20" r="1.5" fill="hsl(var(--background))" />
          <circle cx="27" cy="20" r="3" fill="currentColor" opacity="0.8" />
          <path d="M27 20 C27 18 26 19 27 20 C28 21 26 22 27 20" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M18 27 C18 27 20 25 22 25 C24 25 26 27 26 27" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "bored":
      return (
        <>
          <circle cx="17" cy="19" r="3" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="19" r="1.5" fill="currentColor" />
          <circle cx="27" cy="19" r="3" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="27" cy="19" r="1.5" fill="currentColor" />
          <path d="M19 26 L25 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "stressed":
      return (
        <>
          <line x1="15" y1="16" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="16" x2="15" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="25" y1="16" x2="29" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="29" y1="16" x2="25" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 26 C18 28 22 28 22 26 C22 28 26 28 26 26" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      );
    case "angry":
      return (
        <>
          <line x1="14" y1="16" x2="19" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="30" y1="16" x2="25" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M19 26 L25 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      );
    case "side-eye":
      return (
        <>
          <circle cx="17" cy="20" r="3.5" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="19" cy="20" r="1.8" fill="currentColor" />
          <circle cx="27" cy="20" r="3.5" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="29" cy="20" r="1.8" fill="currentColor" />
          <path d="M20 27 L24 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "hurt":
      return (
        <>
          <path d="M15 18 C15 18 17 15 20 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M29 18 C29 18 27 15 24 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M18 27 C18 25 22 23 26 27" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "guilty":
      return (
        <>
          <circle cx="17" cy="19" r="3" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="20" r="1.5" fill="currentColor" />
          <circle cx="27" cy="19" r="3" fill="hsl(var(--background))" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="28" cy="20" r="1.5" fill="currentColor" />
          <path d="M19 26 C19 26 21 28 22 28 C23 28 25 26 25 26" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </>
      );
  }
};

const getShapePath = (shape: EmotionDef["shape"]) => {
  switch (shape) {
    case "circle":
      return "M22 2 C33 2 42 11 42 22 C42 33 33 42 22 42 C11 42 2 33 2 22 C2 11 11 2 22 2Z";
    case "flower":
      return "M22 2 C28 2 30 8 32 12 C36 8 42 8 42 14 C42 20 36 22 32 22 C36 22 42 24 42 30 C42 36 36 36 32 32 C30 36 28 42 22 42 C16 42 14 36 12 32 C8 36 2 36 2 30 C2 24 8 22 12 22 C8 22 2 20 2 14 C2 8 8 8 12 12 C14 8 16 2 22 2Z";
    case "blob":
      return "M22 2 C32 2 38 6 40 14 C42 22 40 30 36 36 C32 42 24 42 18 40 C12 38 6 34 4 28 C2 22 2 14 6 8 C10 2 16 2 22 2Z";
    case "square":
      return "M8 2 L36 2 C40 2 42 4 42 8 L42 36 C42 40 40 42 36 42 L8 42 C4 42 2 40 2 36 L2 8 C2 4 4 2 8 2Z";
    case "arch":
      return "M6 42 L6 18 C6 9 13 2 22 2 C31 2 38 9 38 18 L38 42 Z";
    case "hex":
      return "M22 2 L38 12 L38 32 L22 42 L6 32 L6 12 Z";
    case "triangle":
      return "M22 2 L42 38 C42 40 41 42 39 42 L5 42 C3 42 2 40 2 38 Z";
    case "rounded-sq":
      return "M10 2 L34 2 C38 2 42 6 42 10 L42 34 C42 38 38 42 34 42 L10 42 C6 42 2 38 2 34 L2 10 C2 6 6 2 10 2Z";
    default:
      return "M22 2 C33 2 42 11 42 22 C42 33 33 42 22 42 C11 42 2 33 2 22 C2 11 11 2 22 2Z";
  }
};

interface EmotionChipsProps {
  selected: string | null;
  onSelect: (label: string, e: React.MouseEvent) => void;
}

const EmotionChips = ({ selected, onSelect }: EmotionChipsProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.15 }}
    className="mb-6 -mx-5 px-5"
  >
    <div
      className="flex gap-3 overflow-x-auto pb-2"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {emotions.map((e, i) => {
        const isSelected = selected === e.label;
        return (
          <motion.button
            key={e.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.04 }}
            whileTap={{ scale: 0.88 }}
            onClick={(ev) => onSelect(e.label, ev)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <motion.div
              animate={isSelected ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative"
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 44 44"
                className="drop-shadow-sm"
                style={{
                  filter: isSelected
                    ? `drop-shadow(0 0 10px hsl(${e.color} / 0.5))`
                    : `drop-shadow(0 2px 4px hsl(${e.color} / 0.2))`,
                }}
              >
                <path
                  d={getShapePath(e.shape)}
                  fill={`hsl(${e.color})`}
                  stroke={isSelected ? "hsl(var(--foreground) / 0.2)" : "none"}
                  strokeWidth={isSelected ? "1.5" : "0"}
                />
                <g color="hsl(var(--foreground) / 0.85)">
                  {getFaceSvg(e.face)}
                </g>
              </svg>
            </motion.div>
            <span
              className="text-[10px] font-body font-medium transition-colors duration-300"
              style={{
                color: isSelected
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground))",
              }}
            >
              {e.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

export default EmotionChips;
