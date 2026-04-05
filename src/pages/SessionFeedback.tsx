import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShieldCheck, Star, Send } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mentors } from "@/data/companionData";
import { toast } from "sonner";

const safetyQuestions = [
  { id: "heard", label: "Did you feel heard?", icon: "👂" },
  { id: "safe", label: "Did you feel safe?", icon: "🛡️" },
  { id: "respected", label: "Did you feel respected?", icon: "🤝" },
  { id: "recommend", label: "Would you recommend this companion?", icon: "💫" },
];

const SessionFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);

  const [rating, setRating] = useState(0);
  const [safetyAnswers, setSafetyAnswers] = useState<Record<string, boolean | null>>({});
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSafetyAnswer = (questionId: string, answer: boolean) => {
    setSafetyAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const allSafetyAnswered = safetyQuestions.every(q => safetyAnswers[q.id] !== undefined && safetyAnswers[q.id] !== null);

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please rate your session");
      return;
    }
    if (!allSafetyAnswered) {
      toast.error("Please answer all safety questions");
      return;
    }

    // Check for safety concerns
    const hasConcerns = Object.values(safetyAnswers).some(v => v === false);
    if (hasConcerns) {
      toast.info("Thank you for sharing. Our team will review your feedback to ensure your safety.", {
        duration: 5000,
      });
    } else {
      toast.success("Thank you for your feedback!");
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ background: "hsla(280 60% 65% / 0.15)" }}
          >
            <Heart size={32} style={{ color: "hsl(280 60% 65%)" }} />
          </motion.div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">Thank you</h2>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-[260px] mx-auto">
            Your feedback helps us keep Companion Mode safe and meaningful for everyone.
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/companion")}
            className="btn-primary"
          >
            Back to Companions
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, top: "5%", right: "-10%", background: "hsl(280 60% 65%)" }}
      />

      <div className="overflow-y-auto pb-8 px-5 pt-12 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
            }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="font-display text-lg font-semibold text-foreground">Session Feedback</h1>
            <p className="font-body text-xs text-muted-foreground">Your experience matters</p>
          </div>
        </div>

        {/* Mentor info */}
        {mentor && (
          <div className="glass-card p-3 flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: mentor.avatarGradient }}
            >
              <span className="text-sm font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
                {mentor.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-body text-sm font-medium text-foreground">{mentor.name}</p>
              <p className="font-body text-xs text-muted-foreground">{mentor.title}</p>
            </div>
          </div>
        )}

        {/* Star Rating */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="font-display text-base font-semibold text-foreground mb-1">How was your session?</h2>
          <p className="font-body text-xs text-muted-foreground mb-3">
            Your honest rating helps others find the right companion.
          </p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
              <motion.button
                key={star}
                whileTap={{ scale: 0.85 }}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  size={32}
                  className={`transition-all ${star <= rating ? "fill-current" : ""}`}
                  style={{
                    color: star <= rating ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))",
                  }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Safety Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck size={14} style={{ color: "hsl(280 60% 65%)" }} />
            <h2 className="font-display text-base font-semibold text-foreground">Safety Check</h2>
          </div>
          <p className="font-body text-xs text-muted-foreground mb-4">
            Your safety is our priority. These answers are confidential.
          </p>

          <div className="space-y-3">
            {safetyQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className="glass-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{q.icon}</span>
                    <span className="font-body text-sm text-foreground">{q.label}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSafetyAnswer(q.id, true)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                        safetyAnswers[q.id] === true
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                      style={safetyAnswers[q.id] !== true ? {
                        background: "hsla(var(--glass-bg))",
                        border: "1px solid hsla(var(--glass-border))",
                      } : {}}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleSafetyAnswer(q.id, false)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-body font-medium transition-all ${
                        safetyAnswers[q.id] === false
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                      style={safetyAnswers[q.id] === false ? {
                        background: "hsl(0 60% 50%)",
                      } : {
                        background: "hsla(var(--glass-bg))",
                        border: "1px solid hsla(var(--glass-border))",
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open feedback */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h2 className="font-display text-base font-semibold text-foreground mb-2">Anything else?</h2>
          <p className="font-body text-xs text-muted-foreground mb-3">
            Share what stood out — it helps your companion grow.
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="What was most helpful? What could be better?"
            rows={4}
            className="glass-input resize-none"
          />
        </motion.div>

        {/* Submit */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Send size={16} />
          Submit Feedback
        </motion.button>

        <p className="font-body text-[10px] text-muted-foreground text-center mt-3">
          If you experienced anything concerning, our support team will reach out within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default SessionFeedback;
