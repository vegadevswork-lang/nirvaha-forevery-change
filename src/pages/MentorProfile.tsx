import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, ShieldCheck, Award, MessageCircle, Phone, Video, Bookmark, Calendar, ChevronDown } from "lucide-react";
import { mentors } from "@/data/companionData";

const sectionAnim = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);
  const [selectedSession, setSelectedSession] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Mentor not found</p>
      </div>
    );
  }

  const formatIcons: Record<string, any> = { Text: MessageCircle, Voice: Phone, Video };
  const firstName = mentor.name.split(" ")[0];

  const toggle = (key: string) => setExpandedSection(prev => prev === key ? null : key);

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, top: "2%", right: "-10%", background: "hsl(var(--healing-green))", opacity: 0.35 }}
      />

      <div className="overflow-y-auto pb-32 relative z-10">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pt-12 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{ background: "hsla(var(--glass-bg))", borderColor: "hsla(var(--glass-border))" }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{ background: "hsla(var(--glass-bg))", borderColor: "hsla(var(--glass-border))" }}
          >
            <Bookmark size={18} className="text-muted-foreground" />
          </motion.button>
        </div>

        {/* ── Hero Card ── */}
        <motion.div {...sectionAnim(0)} className="px-5 mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: mentor.avatarGradient }}
            >
              <span className="text-xl font-display font-semibold text-white">
                {mentor.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-display text-lg font-semibold text-foreground leading-tight">{mentor.name}</h1>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{mentor.title}</p>
              <div className="flex items-center gap-2.5 mt-2">
                <span className="flex items-center gap-1 text-xs font-body">
                  <Star size={12} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
                  <span className="text-foreground font-medium">{mentor.rating}</span>
                  <span className="text-muted-foreground">({mentor.reviewCount})</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="flex items-center gap-1 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  <Clock size={11} />
                  {mentor.nextAvailable}
                </span>
              </div>
            </div>
          </div>

          {/* Trust badges — inline, subtle */}
          <div className="flex items-center gap-3 mt-4 pl-1">
            {mentor.verified && (
              <span className="flex items-center gap-1 text-[11px] font-body text-muted-foreground">
                <ShieldCheck size={12} style={{ color: "hsl(var(--healing-green))" }} />
                Verified
              </span>
            )}
            {mentor.certified && (
              <span className="flex items-center gap-1 text-[11px] font-body text-muted-foreground">
                <Award size={12} style={{ color: "hsl(var(--gold))" }} />
                Certified
              </span>
            )}
            <span className="text-[11px] font-body text-muted-foreground">
              {mentor.sessionsCompleted}+ sessions
            </span>
          </div>
        </motion.div>

        {/* ── About ── */}
        <motion.div {...sectionAnim(0.08)} className="px-5 mb-6">
          <h2 className="font-display text-sm font-semibold text-foreground mb-2">About {firstName}</h2>
          <p className="font-body text-[13px] text-muted-foreground leading-relaxed">{mentor.bio}</p>
        </motion.div>

        {/* ── Specializations — horizontal chips ── */}
        <motion.div {...sectionAnim(0.12)} className="px-5 mb-6">
          <div className="flex flex-wrap gap-2">
            {mentor.specializations.map(s => (
              <span
                key={s}
                className="text-[11px] font-body px-3 py-1.5 rounded-full"
                style={{ background: "hsla(var(--healing-green) / 0.08)", color: "hsl(var(--healing-green))" }}
              >
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Expandable details (progressive disclosure) ── */}
        <motion.div {...sectionAnim(0.16)} className="px-5 mb-6 space-y-2">
          {[
            { key: "audience", title: "Who I work with", content: mentor.targetAudience.join(" · ") },
            { key: "approach", title: "My approach", content: mentor.approach },
            { key: "expect", title: "What to expect", content: mentor.expectation },
          ].map(({ key, title, content }) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className="w-full text-left rounded-2xl p-3.5 transition-colors"
              style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-semibold text-foreground">{title}</span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform ${expandedSection === key ? "rotate-180" : ""}`}
                />
              </div>
              <AnimatePresence>
                {expandedSection === key && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-body text-xs text-muted-foreground leading-relaxed mt-2 overflow-hidden"
                  >
                    {content}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </motion.div>

        {/* ── Reviews — show 1, expandable ── */}
        <motion.div {...sectionAnim(0.2)} className="px-5 mb-6">
          <h2 className="font-display text-sm font-semibold text-foreground mb-3">What people say</h2>
          {mentor.reviews.slice(0, 1).map((r, i) => (
            <div key={i} className="rounded-2xl p-3.5 mb-2" style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-body font-semibold"
                  style={{ background: "hsla(var(--healing-green) / 0.1)", color: "hsl(var(--healing-green))" }}
                >
                  {r.author[0]}
                </div>
                <span className="font-body text-xs font-medium text-foreground">{r.author}</span>
                <div className="flex gap-0.5 ml-auto">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={10} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
                  ))}
                </div>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed italic">"{r.text}"</p>
            </div>
          ))}
          {mentor.reviews.length > 1 && (
            <button
              onClick={() => toggle("reviews")}
              className="font-body text-xs font-medium flex items-center gap-1 mt-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              {expandedSection === "reviews" ? "Show less" : `See all ${mentor.reviewCount} reviews`}
              <ChevronDown size={12} className={expandedSection === "reviews" ? "rotate-180" : ""} />
            </button>
          )}
          <AnimatePresence>
            {expandedSection === "reviews" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-2 space-y-2"
              >
                {mentor.reviews.slice(1).map((r, i) => (
                  <div key={i} className="rounded-2xl p-3.5" style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-body font-semibold"
                        style={{ background: "hsla(var(--healing-green) / 0.1)", color: "hsl(var(--healing-green))" }}
                      >
                        {r.author[0]}
                      </div>
                      <span className="font-body text-xs font-medium text-foreground">{r.author}</span>
                      <div className="flex gap-0.5 ml-auto">
                        {Array.from({ length: r.rating }).map((_, j) => (
                          <Star key={j} size={10} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
                        ))}
                      </div>
                    </div>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed italic">"{r.text}"</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Sticky bottom CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-5 pb-5 pt-3" style={{ background: "linear-gradient(to top, hsl(var(--background)) 70%, transparent)" }}>
        {/* Session selector */}
        <div className="flex gap-2 mb-3">
          {mentor.sessionOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedSession(i)}
              className={`flex-1 py-2.5 rounded-2xl font-body text-sm font-medium transition-all ${
                selectedSession === i ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {opt.duration} · ₹{opt.price}
            </button>
          ))}
        </div>
        <div className="flex gap-2.5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="flex-1 btn-primary flex items-center justify-center gap-2"
            onClick={() => navigate(`/companion/book/${mentor.id}?session=${selectedSession}`)}
          >
            <Calendar size={16} />
            Book Session
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0"
            style={{ background: "hsla(var(--glass-bg))", borderColor: "hsla(var(--glass-border))" }}
          >
            <MessageCircle size={18} className="text-foreground" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
