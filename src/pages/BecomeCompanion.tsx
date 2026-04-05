import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, Heart, Sparkles, ShieldCheck, Users, BookOpen, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contributorDomains } from "@/data/companionData";

type Step = "intro" | "select-domain" | "info" | "submitted";

const BecomeCompanion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    motivation: "",
  });

  const toggleRole = (role: string) => {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, bottom: "30%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      <div className="flex-1 overflow-y-auto pb-12 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (step === "intro") navigate(-1);
              else if (step === "select-domain") setStep("intro");
              else if (step === "info") setStep("select-domain");
              else navigate("/companion");
            }}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
            }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Become a Companion</h1>
            <p className="font-body text-xs text-muted-foreground">Share your wisdom with those who need it</p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              {/* Hero message */}
              <div
                className="rounded-3xl p-6 text-center"
                style={{
                  background: "linear-gradient(160deg, hsl(var(--healing-green)), hsl(var(--gold)))",
                  boxShadow: "0 16px 48px hsla(var(--gold) / 0.2)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "hsla(var(--primary-foreground) / 0.15)" }}
                >
                  <Heart size={28} style={{ color: "hsl(var(--primary-foreground))" }} />
                </motion.div>
                <h2 className="font-display text-lg font-semibold mb-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                  Your experience can transform someone's life.
                </h2>
                <p className="font-body text-sm" style={{ color: "hsla(var(--primary-foreground) / 0.8)" }}>
                  Nirvaha connects people with mentors and guides who've walked similar paths. 
                  If you have wisdom to share, we'd love to have you.
                </p>
              </div>

              {/* What we look for */}
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">What we look for</h3>
                {[
                  { icon: ShieldCheck, title: "Verified credentials", desc: "Professional certifications, lineage verification, or equivalent experience" },
                  { icon: Users, title: "Genuine empathy", desc: "A deep commitment to holding space for others without judgment" },
                  { icon: BookOpen, title: "Domain expertise", desc: "Real-world experience in your area — not just theoretical knowledge" },
                  { icon: Sparkles, title: "Cultural sensitivity", desc: "Ability to work with diverse backgrounds, beliefs, and life experiences" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="glass-card p-4 mb-2.5 flex gap-3"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "hsla(var(--healing-green) / 0.1)" }}
                    >
                      <item.icon size={18} style={{ color: "hsl(var(--healing-green))" }} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* The process */}
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">The process</h3>
                <div className="glass-card p-4">
                  {["Apply & share your background", "Credential verification (3-5 days)", "Onboarding & Nirvaha method training", "Profile goes live — start connecting"].map((s, i) => (
                    <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-body font-semibold flex-shrink-0 mt-0.5"
                        style={{ background: "hsla(var(--primary) / 0.1)", color: "hsl(var(--primary))" }}
                      >
                        {i + 1}
                      </div>
                      <p className="font-body text-sm text-foreground">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("select-domain")}
                className="btn-primary flex items-center justify-center gap-2 w-full"
              >
                Start Your Application
                <ChevronRight size={16} />
              </motion.button>

              <p className="font-body text-[11px] text-muted-foreground text-center">
                Takes about 5 minutes. You can save and continue later.
              </p>
            </motion.div>
          )}

          {step === "select-domain" && (
            <motion.div
              key="select-domain"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-2">
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">Choose your domain(s)</h2>
                <p className="font-body text-xs text-muted-foreground">
                  Select the roles that best describe your expertise.
                </p>
                {selectedRoles.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-body text-xs mt-2"
                    style={{ color: "hsl(var(--gold))" }}
                  >
                    {selectedRoles.length} selected
                  </motion.p>
                )}
              </div>

              {contributorDomains.map((category, ci) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.05 }}
                >
                  <h3 className="font-display text-xs font-semibold text-muted-foreground mb-3 tracking-widest uppercase">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {category.roles.map(role => {
                      const isActive = selectedRoles.includes(role);
                      return (
                        <motion.button
                          key={role}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleRole(role)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-body font-medium transition-all duration-200"
                          style={isActive ? {
                            background: "hsla(var(--gold) / 0.15)",
                            color: "hsl(var(--gold))",
                            border: "1.5px solid hsla(var(--gold) / 0.4)",
                          } : {
                            background: "hsla(var(--glass-bg))",
                            color: "hsl(var(--muted-foreground))",
                            border: "1.5px solid hsla(var(--glass-border))",
                          }}
                        >
                          <span className="text-[10px] opacity-70">{isActive ? "✓" : "+"}</span>
                          {role}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              <div className="pt-2 pb-4">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep("info")}
                  disabled={selectedRoles.length === 0}
                  className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-40"
                >
                  Continue
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">Tell us about yourself</h2>
                <p className="font-body text-xs text-muted-foreground">
                  This helps us understand your background and match you with the right people.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                  <input
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    type="email"
                    className="glass-input"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Experience & Credentials</label>
                  <textarea
                    value={formData.experience}
                    onChange={e => setFormData(p => ({ ...p, experience: e.target.value }))}
                    placeholder="Describe your professional background, certifications, years of experience, or spiritual lineage..."
                    rows={4}
                    className="glass-input resize-none"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Why do you want to be a companion?</label>
                  <textarea
                    value={formData.motivation}
                    onChange={e => setFormData(p => ({ ...p, motivation: e.target.value }))}
                    placeholder="What drives you to help others? Share your story..."
                    rows={3}
                    className="glass-input resize-none"
                  />
                </div>
              </div>

              <div className="glass-card p-3">
                <h4 className="font-display text-xs font-semibold text-foreground mb-1">Selected roles:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRoles.map(r => (
                    <span
                      key={r}
                      className="text-[10px] font-body px-2 py-0.5 rounded-full"
                      style={{
                        background: "hsla(var(--healing-green) / 0.08)",
                        color: "hsl(var(--healing-green))",
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("submitted")}
                disabled={!formData.name || !formData.email || !formData.experience}
                className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-40"
              >
                Submit Application
              </motion.button>

              <p className="font-body text-[11px] text-muted-foreground text-center">
                We'll review your application within 3-5 business days.
              </p>
            </motion.div>
          )}

          {step === "submitted" && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center pt-12 space-y-5"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "hsla(var(--healing-green) / 0.12)" }}
              >
                <CheckCircle2 size={36} style={{ color: "hsl(var(--healing-green))" }} />
              </motion.div>

              <h2 className="font-display text-xl font-semibold text-foreground">
                Application received! 🙏
              </h2>
              <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
                Thank you for wanting to share your wisdom. We'll review your application 
                and get back to you within 3-5 business days.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                "The best teachers are those who show you where to look, but don't tell you what to see."
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/home")}
                className="btn-primary mt-4"
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BecomeCompanion;
