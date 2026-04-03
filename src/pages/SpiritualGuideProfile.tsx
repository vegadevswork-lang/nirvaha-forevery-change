import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Calendar } from "lucide-react";
import { spiritualGuides } from "@/data/companionData";

const SpiritualGuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guide = spiritualGuides.find(g => g.id === id);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Guide not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "3%", right: "-10%", background: "hsl(var(--gold))" }}
      />

      <div className="overflow-y-auto pb-8 relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-12 mb-4">
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
            }}
          >
            <Bookmark size={18} className="text-muted-foreground" />
          </motion.button>
        </div>

        {/* Header — humble, centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 flex flex-col items-center text-center mb-6"
        >
          <div className="relative mb-3">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ background: guide.avatarGradient }}
            >
              <span className="text-2xl font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
                {guide.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-sm"
              style={{
                background: "hsl(var(--gold))",
                boxShadow: "0 2px 8px hsla(var(--gold) / 0.3)",
              }}
            >
              🕉️
            </span>
          </div>
          <h1 className="font-display text-xl font-semibold text-foreground">{guide.name}</h1>
          <p className="font-body text-sm mt-0.5" style={{ color: "hsl(var(--accent))" }}>
            {guide.spiritualTitle} · {guide.tradition}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">{guide.lineage}</p>
          {guide.institution && (
            <p className="font-body text-xs text-muted-foreground">{guide.institution}</p>
          )}
        </motion.div>

        {/* Verification */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-5 mb-5"
        >
          <div className="glass-card p-4">
            <div className="flex flex-col gap-2">
              {guide.lineageVerified && (
                <span className="flex items-center gap-2 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  ✓ Lineage Verified — {guide.tradition}
                </span>
              )}
              {guide.institution && (
                <span className="flex items-center gap-2 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  ✓ Institutional Affiliation — {guide.institution}
                </span>
              )}
              {guide.communityEndorsed && (
                <span className="flex items-center gap-2 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  ✓ Community Endorsed
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-5 mb-5"
        >
          <p className="font-body text-sm text-muted-foreground leading-relaxed italic">{guide.bio}</p>
        </motion.div>

        {/* Teaching Layer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">I offer:</h3>
          <div className="space-y-2">
            {guide.offerings.map(o => (
              <div key={o} className="glass-card p-3 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ background: "hsla(var(--gold) / 0.12)" }}
                >
                  🪷
                </div>
                <span className="font-body text-sm text-foreground">{o}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Session style */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-2">Session style:</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{guide.sessionStyle}</p>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5 mb-5"
        >
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: "hsla(var(--gold) / 0.06)",
              borderColor: "hsla(var(--gold) / 0.15)",
            }}
          >
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              ⚠ This is not therapy. It's spiritual companionship for those who seek it. 
              If you're in crisis, please reach out to a mental health professional or crisis helpline.
            </p>
          </div>
        </motion.div>

        {/* Logistics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">Request a Session</h3>

          <div className="glass-card p-4 mb-3">
            <p className="font-body text-xs text-muted-foreground mb-2">Donation-based</p>
            <p className="font-display text-lg font-semibold text-foreground">
              ₹{guide.donationRange.min} — ₹{guide.donationRange.max}
            </p>
            <p className="font-body text-[11px] text-muted-foreground mt-1">
              Suggested range · Give what feels right
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            {guide.formats.map(f => (
              <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body glass-card">
                {f}
              </span>
            ))}
          </div>

          <p className="font-body text-[11px] text-muted-foreground mb-4 italic">
            The guide will review your request and respond if it's a fit. This is not instant booking.
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <Calendar size={16} />
            Request a Session
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default SpiritualGuideProfile;
