import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The sweep overlay color — defaults to primary */
  sweepColor?: string;
  /** Content to show on hover (optional, defaults to children) */
  hoverContent?: React.ReactNode;
  /** Glass variant for sanctuary-style buttons */
  variant?: "default" | "glass" | "gold" | "outline";
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(
  (
    {
      children,
      className,
      sweepColor,
      hoverContent,
      variant = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);

    const variantStyles = {
      default: {
        bg: "hsl(var(--primary))",
        text: "hsl(var(--primary-foreground))",
        sweep: sweepColor || "hsl(var(--healing-green-light))",
        border: "hsl(var(--primary) / 0.3)",
      },
      glass: {
        bg: "hsl(var(--card) / 0.35)",
        text: "hsl(var(--foreground))",
        sweep: sweepColor || "hsl(var(--primary) / 0.15)",
        border: "hsl(var(--glass-border))",
      },
      gold: {
        bg: "hsl(var(--gold) / 0.28)",
        text: "hsl(var(--foreground))",
        sweep: sweepColor || "hsl(var(--gold) / 0.4)",
        border: "hsl(var(--gold) / 0.6)",
      },
      outline: {
        bg: "transparent",
        text: "hsl(var(--foreground))",
        sweep: sweepColor || "hsl(var(--primary) / 0.08)",
        border: "hsl(var(--border))",
      },
    };

    const styles = variantStyles[variant];

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl font-display text-sm font-semibold",
          "transition-all duration-300 cursor-pointer select-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          className
        )}
        style={{
          background: styles.bg,
          color: styles.text,
          border: `1px solid ${styles.border}`,
          backdropFilter: variant === "glass" ? "blur(24px) saturate(1.3)" : undefined,
          WebkitBackdropFilter: variant === "glass" ? "blur(24px) saturate(1.3)" : undefined,
        }}
        onHoverStart={() => !disabled && setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTouchStart={() => !disabled && setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        disabled={disabled}
        {...(props as any)}
      >
        {/* Sweep overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: `linear-gradient(90deg, ${styles.sweep}, ${styles.sweep}88)`,
          }}
        />

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            boxShadow: isHovered
              ? `inset 0 0 20px ${styles.sweep}40, 0 0 20px ${styles.sweep}20`
              : "inset 0 0 0px transparent, 0 0 0px transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <motion.span
            animate={{
              letterSpacing: isHovered ? "0.06em" : "0.01em",
            }}
            transition={{ duration: 0.3 }}
          >
            {isHovered && hoverContent ? hoverContent : children}
          </motion.span>
        </span>
      </motion.button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
export type { InteractiveHoverButtonProps };
