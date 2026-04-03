import { motion } from "framer-motion";
import { AlertTriangle, Heart } from "lucide-react";
import type { ModerationResult } from "@/hooks/use-content-moderation";

const ModerationBanner = ({
  result,
  onDismiss,
}: {
  result: ModerationResult;
  onDismiss: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    className="rounded-xl p-4 mb-3"
    style={{
      background: result.isCrisis
        ? "linear-gradient(135deg, hsl(0 60% 50% / 0.15), hsl(0 60% 50% / 0.05))"
        : "linear-gradient(135deg, hsl(42 80% 55% / 0.15), hsl(42 80% 55% / 0.05))",
      border: `1px solid ${
        result.isCrisis
          ? "hsl(0 60% 50% / 0.2)"
          : "hsl(42 80% 55% / 0.2)"
      }`,
    }}
  >
    <div className="flex items-start gap-2.5">
      {result.isCrisis ? (
        <Heart
          size={16}
          className="mt-0.5 flex-shrink-0"
          style={{ color: "hsl(0 60% 50%)" }}
        />
      ) : (
        <AlertTriangle
          size={16}
          className="mt-0.5 flex-shrink-0"
          style={{ color: "hsl(42 80% 55%)" }}
        />
      )}
      <div className="flex-1">
        {result.isCrisis ? (
          <>
            <p className="font-body text-sm font-semibold text-foreground mb-1">
              We care about you 💛
            </p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed whitespace-pre-line mb-2">
              {result.crisisResources}
            </p>
          </>
        ) : (
          <>
            {result.warnings.map((w, i) => (
              <p key={i} className="font-body text-xs text-foreground mb-1">
                {w}
              </p>
            ))}
            {result.suggestions.map((s, i) => (
              <p
                key={i}
                className="font-body text-[11px] text-muted-foreground italic"
              >
                {s}
              </p>
            ))}
          </>
        )}
        {!result.isCrisis && (
          <button
            onClick={onDismiss}
            className="font-body text-[10px] text-muted-foreground underline mt-1"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export default ModerationBanner;
