import { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Clock, ShieldCheck, Award, MessageCircle, Phone, Video, Bookmark, Calendar, ChevronRight } from "lucide-react";
import { mentors } from "@/data/companionData";

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const mentor = mentors.find(m => m.id === id);
  const [selectedSession, setSelectedSession] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!mentor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Mentor not found</p>
      </div>
    );
  }

  const formatIcons: Record<string, any> = { Text: MessageCircle, Voice: Phone, Video: Video };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, top: "2%", right: "-8%", background: "hsl(var(--healing-green))" }}
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-5 flex items-start gap-4 mb-6"
        >
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0"
            style={{ background: mentor.avatarGradient }}
          >
            <span className="text-2xl font-display font-semibold" style={{ color: "hsl(var(--primary-foreground))" }}>
              {mentor.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-semibold text-foreground">{mentor.name}</h1>
            <p className="font-body text-sm text-muted-foreground">{mentor.title}</p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">{mentor.location}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-sm font-body">
                <Star size={14} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
                <span className="text-foreground font-medium">{mentor.rating}</span>
                <span className="text-muted-foreground text-xs">| {mentor.reviewCount} reviews</span>
              </span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Clock size={12} className="text-muted-foreground" />
              <span className="font-body text-xs" style={{ color: "hsl(var(--healing-green))" }}>
                Next: {mentor.nextAvailable}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Trust Layer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-5 mb-5"
        >
          <div className="glass-card p-4">
            <div className="flex flex-wrap gap-3">
              {mentor.verified && (
                <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  <ShieldCheck size={14} />
                  Background Verified
                </span>
              )}
              {mentor.certified && (
                <span className="flex items-center gap-1.5 text-xs font-body" style={{ color: "hsl(var(--healing-green))" }}>
                  <Award size={14} />
                  Nirvaha Certified Guide
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
                <Calendar size={14} />
                {mentor.sessionsCompleted} sessions completed
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {mentor.specializations.map(s => (
                <span
                  key={s}
                  className="text-[11px] font-body px-2.5 py-1 rounded-full"
                  style={{
                    background: "hsla(var(--healing-green) / 0.08)",
                    color: "hsl(var(--healing-green))",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bio / Connection Layer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-2">About {mentor.name.split(" ")[0]}</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">{mentor.bio}</p>
        </motion.div>

        {/* Specificity Layer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-5 mb-5 space-y-3"
        >
          <div className="glass-card p-4">
            <h4 className="font-display text-xs font-semibold text-foreground mb-1.5">I work best with:</h4>
            <div className="flex flex-wrap gap-1.5">
              {mentor.targetAudience.map(t => (
                <span key={t} className="text-[11px] font-body text-muted-foreground">• {t}</span>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <h4 className="font-display text-xs font-semibold text-foreground mb-1.5">My approach:</h4>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{mentor.approach}</p>
          </div>
          <div className="glass-card p-4">
            <h4 className="font-display text-xs font-semibold text-foreground mb-1.5">Expect:</h4>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{mentor.expectation}</p>
          </div>
        </motion.div>

        {/* Reviews / Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">What people say</h3>
          {mentor.reviews.slice(0, showAllReviews ? undefined : 2).map((r, i) => (
            <div key={i} className="glass-card p-3 mb-2">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-body font-semibold"
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
          {mentor.reviews.length > 2 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="font-body text-xs font-medium flex items-center gap-1 mt-1"
              style={{ color: "hsl(var(--primary))" }}
            >
              {showAllReviews ? "Show less" : `See all ${mentor.reviewCount} reviews`}
              <ChevronRight size={12} />
            </button>
          )}
        </motion.div>

        {/* Session Options / Logistics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-5 mb-5"
        >
          <h3 className="font-display text-sm font-semibold text-foreground mb-3">Book a Session</h3>

          {/* Session duration selector */}
          <div className="flex gap-2 mb-3">
            {mentor.sessionOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelectedSession(i)}
                className={`flex-1 py-3 rounded-2xl font-body text-sm font-medium transition-all ${
                  selectedSession === i ? "bg-primary text-primary-foreground" : "glass-card"
                }`}
              >
                <span className="block">{opt.duration}</span>
                <span className={`text-xs ${selectedSession === i ? "opacity-80" : "text-muted-foreground"}`}>
                  ₹{opt.price}
                </span>
              </button>
            ))}
          </div>

          {/* Format badges */}
          <div className="flex gap-2 mb-3">
            {mentor.formats.map(f => {
              const Icon = formatIcons[f] || MessageCircle;
              return (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body glass-card">
                  <Icon size={12} />
                  {f}
                </span>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mb-4 text-xs font-body text-muted-foreground">
            <Clock size={12} />
            <span>{mentor.availability}</span>
            <span className="mx-1">·</span>
            <span>Responds {mentor.responseTime.toLowerCase()}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
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
              className="btn-guest px-4 flex items-center justify-center gap-2"
              style={{ width: "auto" }}
            >
              <MessageCircle size={16} />
              Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorProfile;
