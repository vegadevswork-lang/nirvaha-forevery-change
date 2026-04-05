import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight, ChevronDown, Heart, Sparkles, Users, CheckCircle2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { contributorRoles, supportDomains, specializations } from "@/data/companionData";

type Step = "intro" | "role" | "domains" | "specialization" | "info" | "submitted";

const BecomeCompanion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("intro");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", experience: "", motivation: "" });
  const [hasTypedName, setHasTypedName] = useState(false);

  const toggleDomain = (id: string) =>
    setSelectedDomains(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);

  const toggleSpec = (role: string) =>
    setSelectedSpecs(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);

  const goBack = () => {
    if (step === "intro") navigate(-1);
    else if (step === "role") setStep("intro");
    else if (step === "domains") setStep("role");
    else if (step === "specialization") setStep("domains");
    else if (step === "info") setStep(selectedRole === "expert" ? "specialization" : "domains");
    else navigate("/companion");
  };

  const goNext = () => {
    if (step === "role") setStep("domains");
    else if (step === "domains") setStep(selectedRole === "expert" ? "specialization" : "info");
    else if (step === "specialization") setStep("info");
  };

  const stepLabels: Record<string, string> = {
    intro: "",
    role: "Step 1 of 3",
    domains: "Step 2 of 3",
    specialization: "Step 2b of 3",
    info: "Step 3 of 3",
    submitted: "",
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="ambient-orb animate-pulse-soft" style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }} />
      <div className="ambient-orb animate-pulse-soft" style={{ width: 160, height: 160, bottom: "30%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }} />

      <div className="flex-1 overflow-y-auto pb-12 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goBack}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{ background: "hsla(var(--glass-bg))", borderColor: "hsla(var(--glass-border))" }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Become a Companion</h1>
            {stepLabels[step] && (
              <p className="font-body text-xs text-muted-foreground">{stepLabels[step]}</p>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── INTRO ── */}
          {step === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-5">
              <div
                className="rounded-3xl p-6 text-center"
                style={{ background: "linear-gradient(160deg, hsl(var(--healing-green)), hsl(var(--gold)))", boxShadow: "0 16px 48px hsla(var(--gold) / 0.2)" }}
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "hsla(var(--primary-foreground) / 0.15)" }}>
                  <Heart size={28} style={{ color: "hsl(var(--primary-foreground))" }} />
                </motion.div>
                <h2 className="font-display text-lg font-semibold mb-2" style={{ color: "hsl(var(--primary-foreground))" }}>
                  Everyone has something to offer.
                </h2>
                <p className="font-body text-sm" style={{ color: "hsla(var(--primary-foreground) / 0.8)" }}>
                  You don't need a degree to make a difference. Whether you're a good listener, an experienced guide, or a certified expert — there's a place for you here.
                </p>
              </div>

              <div>
                <h3 className="font-display text-sm font-semibold text-foreground mb-3">Who can join?</h3>
                {[
                  { icon: Users, title: "Anyone who cares", desc: "Good listeners with empathy and life experience" },
                  { icon: Sparkles, title: "Experienced guides", desc: "People with personal growth knowledge or informal training" },
                  { icon: CheckCircle2, title: "Certified professionals", desc: "Therapists, coaches, counselors with credentials" },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }} className="glass-card p-4 mb-2.5 flex gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "hsla(var(--healing-green) / 0.1)" }}>
                      <item.icon size={18} style={{ color: "hsl(var(--healing-green))" }} />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button whileTap={{ scale: 0.97 }} onClick={() => setStep("role")} className="btn-primary flex items-center justify-center gap-2 w-full mt-2">
                I want to help others <ChevronRight size={16} />
              </motion.button>
              <p className="font-body text-[11px] text-muted-foreground text-center">Takes about 3 minutes. No credentials required.</p>
            </motion.div>
          )}

          {/* ── STEP 1: HOW WOULD YOU LIKE TO HELP? ── */}
          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="text-center mb-1">
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">How would you like to help others?</h2>
                <p className="font-body text-xs text-muted-foreground">Choose what feels right for you. You can always grow into more.</p>
              </div>

              <div className="space-y-3">
                {contributorRoles.map((role, i) => {
                  const isActive = selectedRole === role.id;
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedRole(role.id)}
                      className="w-full text-left rounded-2xl p-4 transition-all duration-200 border"
                      style={isActive ? {
                        background: "hsla(var(--gold) / 0.1)",
                        borderColor: "hsla(var(--gold) / 0.4)",
                        boxShadow: "0 0 20px hsla(var(--gold) / 0.1)",
                      } : {
                        background: "hsla(var(--glass-bg))",
                        borderColor: "hsla(var(--glass-border))",
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl mt-0.5">{role.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-sm font-semibold text-foreground">{role.label}</h3>
                            {isActive && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <CheckCircle2 size={16} style={{ color: "hsl(var(--gold))" }} />
                              </motion.div>
                            )}
                          </div>
                          <p className="font-body text-xs text-muted-foreground mt-1 leading-relaxed">{role.description}</p>
                          <span
                            className="inline-block mt-2 text-[10px] font-body px-2.5 py-0.5 rounded-full"
                            style={{
                              background: isActive ? "hsla(var(--gold) / 0.15)" : "hsla(var(--muted) / 0.5)",
                              color: isActive ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))",
                            }}
                          >
                            You'll appear as: {role.tag}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                disabled={!selectedRole}
                className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-40"
              >
                Continue <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2: WHAT TOPICS? ── */}
          {step === "domains" && (
            <motion.div key="domains" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="text-center mb-1">
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">What would you like to help with?</h2>
                <p className="font-body text-xs text-muted-foreground">Pick the areas that resonate with you. Select as many as you like.</p>
                {selectedDomains.length > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-xs mt-2" style={{ color: "hsl(var(--gold))" }}>
                    {selectedDomains.length} selected
                  </motion.p>
                )}
              </div>

              <div className="space-y-2.5">
                {supportDomains.map((domain, i) => {
                  const isActive = selectedDomains.includes(domain.id);
                  const isHighlight = domain.id === "talk";
                  return (
                    <motion.button
                      key={domain.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleDomain(domain.id)}
                      className="w-full text-left rounded-2xl p-3.5 transition-all duration-200 border"
                      style={isActive ? {
                        background: "hsla(var(--gold) / 0.1)",
                        borderColor: "hsla(var(--gold) / 0.4)",
                      } : isHighlight ? {
                        background: "hsla(var(--healing-green) / 0.05)",
                        borderColor: "hsla(var(--healing-green) / 0.2)",
                      } : {
                        background: "hsla(var(--glass-bg))",
                        borderColor: "hsla(var(--glass-border))",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{domain.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-sm font-semibold text-foreground">{domain.label}</h3>
                            {isHighlight && !isActive && (
                              <span className="text-[9px] font-body px-1.5 py-0.5 rounded-full" style={{ background: "hsla(var(--healing-green) / 0.15)", color: "hsl(var(--healing-green))" }}>
                                Popular
                              </span>
                            )}
                            {isActive && <CheckCircle2 size={14} style={{ color: "hsl(var(--gold))" }} />}
                          </div>
                          <p className="font-body text-[11px] text-muted-foreground mt-0.5 truncate">
                            {domain.topics.join(" · ")}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                disabled={selectedDomains.length === 0}
                className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-40"
              >
                Continue <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          )}

          {/* ── STEP 2b: OPTIONAL SPECIALIZATION (experts only) ── */}
          {step === "specialization" && (
            <motion.div key="specialization" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div className="text-center mb-1">
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">Your specialization</h2>
                <p className="font-body text-xs text-muted-foreground">Optional — helps us match you with the right people.</p>
                {selectedSpecs.length > 0 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-body text-xs mt-2" style={{ color: "hsl(var(--gold))" }}>
                    {selectedSpecs.length} selected
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                {specializations.map((cat) => {
                  const isExpanded = expandedCat === cat.category;
                  const hasSelected = cat.roles.some(r => selectedSpecs.includes(r));
                  return (
                    <div key={cat.category}>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setExpandedCat(isExpanded ? null : cat.category)}
                        className="w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all"
                        style={{
                          background: hasSelected ? "hsla(var(--gold) / 0.06)" : "hsla(var(--glass-bg))",
                          borderColor: hasSelected ? "hsla(var(--gold) / 0.3)" : "hsla(var(--glass-border))",
                        }}
                      >
                        <span className="font-display text-sm font-semibold text-foreground">{cat.category}</span>
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={16} className="text-muted-foreground" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2 pt-2 pb-1 px-1">
                              {cat.roles.map(role => {
                                const isActive = selectedSpecs.includes(role);
                                return (
                                  <motion.button
                                    key={role}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleSpec(role)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200"
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
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep("info")}
                  className="btn-primary flex items-center justify-center gap-2 w-full"
                >
                  {selectedSpecs.length > 0 ? "Continue" : "Skip for now"} <ChevronRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: INFO ── */}
          {step === "info" && (
            <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
              <div>
                <h2 className="font-display text-lg font-semibold text-foreground mb-1">Almost there!</h2>
                <p className="font-body text-xs text-muted-foreground">Tell us a little about yourself.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">What should people call you?</label>
                  <input value={formData.name} onChange={e => { const v = e.target.value; if (!hasTypedName && v.length > 0) setHasTypedName(true); setFormData(p => ({ ...p, name: v })); }} placeholder="Your name or alias" className="glass-input" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <input value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" type="email" className="glass-input" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">
                    {selectedRole === "expert" ? "Your credentials & experience" : "What life experience do you bring?"}
                  </label>
                  <textarea
                    value={formData.experience}
                    onChange={e => setFormData(p => ({ ...p, experience: e.target.value }))}
                    placeholder={selectedRole === "expert"
                      ? "Describe your certifications, training, and years of experience..."
                      : "What have you been through that could help someone else? No wrong answers here..."
                    }
                    rows={3}
                    className="glass-input resize-none"
                  />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground mb-1.5 block">Why do you want to be a companion?</label>
                  <textarea
                    value={formData.motivation}
                    onChange={e => setFormData(p => ({ ...p, motivation: e.target.value }))}
                    placeholder="What drives you to help others?"
                    rows={2}
                    className="glass-input resize-none"
                  />
                </div>
              </div>

              {/* Live Profile Preview */}
              {(() => {
                const role = contributorRoles.find(r => r.id === selectedRole);
                const domains = selectedDomains.map(id => supportDomains.find(x => x.id === id)).filter(Boolean);
                const initials = formData.name
                  ? formData.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
                  : "??";
                const avatarGradient = selectedRole === "expert"
                  ? "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold)))"
                  : selectedRole === "guide"
                  ? "linear-gradient(135deg, hsl(var(--healing-green)), hsl(var(--gold)))"
                  : "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--healing-green)))";

                return (
                  <div className="space-y-2">
                    <p className="font-body text-[11px] text-muted-foreground text-center">Preview — how people will see you</p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        boxShadow: hasTypedName && formData.name.length > 0
                          ? [
                              "0 8px 32px hsla(var(--gold) / 0.08)",
                              "0 8px 40px hsla(var(--gold) / 0.25)",
                              "0 8px 32px hsla(var(--gold) / 0.08)",
                            ]
                          : "0 8px 32px hsla(var(--gold) / 0.08)",
                      }}
                      transition={hasTypedName && formData.name.length > 0 ? { boxShadow: { duration: 2, repeat: 2, ease: "easeInOut" } } : {}}
                      className="rounded-2xl p-4 border overflow-hidden relative"
                      style={{
                        background: "hsla(var(--glass-bg))",
                        borderColor: hasTypedName && formData.name.length > 0 ? "hsla(var(--gold) / 0.4)" : "hsla(var(--glass-border))",
                      }}
                    >
                      {/* Subtle ambient glow */}
                      <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-20 blur-2xl" style={{ background: avatarGradient }} />

                      <div className="flex items-start gap-3 relative z-10">
                        {/* Avatar */}
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: avatarGradient }}
                        >
                          <span className="text-sm font-display font-bold" style={{ color: "hsl(var(--primary-foreground))" }}>
                            {initials}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-sm font-semibold text-foreground truncate">
                              {formData.name || "Your Name"}
                            </h4>
                            {selectedRole === "expert" && (
                              <ShieldCheck size={13} style={{ color: "hsl(var(--gold))" }} className="flex-shrink-0" />
                            )}
                          </div>
                          {role && (
                            <span
                              className="inline-block text-[10px] font-body px-2 py-0.5 rounded-full mt-1"
                              style={{ background: "hsla(var(--gold) / 0.12)", color: "hsl(var(--gold))" }}
                            >
                              {role.emoji} {role.tag}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bio preview */}
                      {formData.motivation && (
                        <p className="font-body text-xs text-muted-foreground mt-3 leading-relaxed line-clamp-2 italic relative z-10">
                          "{formData.motivation}"
                        </p>
                      )}

                      {/* Domain chips */}
                      {domains.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 relative z-10">
                          {domains.map(d => d && (
                            <span
                              key={d.id}
                              className="text-[10px] font-body px-2 py-0.5 rounded-full"
                              style={{ background: "hsla(var(--healing-green) / 0.08)", color: "hsl(var(--healing-green))" }}
                            >
                              {d.emoji} {d.label}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Specialization chips */}
                      {selectedSpecs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 relative z-10">
                          {selectedSpecs.map(s => (
                            <span
                              key={s}
                              className="text-[10px] font-body px-2 py-0.5 rounded-full"
                              style={{ background: "hsla(var(--primary) / 0.08)", color: "hsl(var(--primary))" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Availability hint */}
                      <div className="flex items-center gap-1.5 mt-3 relative z-10">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(var(--healing-green))" }} />
                        <span className="font-body text-[10px] text-muted-foreground">Available to connect</span>
                      </div>
                    </motion.div>
                  </div>
                );
              })()}

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => setStep("submitted")}
                disabled={!formData.name || !formData.email}
                className="btn-primary flex items-center justify-center gap-2 w-full disabled:opacity-40"
              >
                Submit Application
              </motion.button>
              <p className="font-body text-[11px] text-muted-foreground text-center">We'll get back to you within 2-3 days.</p>
            </motion.div>
          )}

          {/* ── SUBMITTED ── */}
          {step === "submitted" && (
            <motion.div key="submitted" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center pt-12 space-y-5">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "hsla(var(--healing-green) / 0.12)" }}>
                <CheckCircle2 size={36} style={{ color: "hsl(var(--healing-green))" }} />
              </motion.div>
              <h2 className="font-display text-xl font-semibold text-foreground">You're in! 🙏</h2>
              <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
                Thank you for offering to be part of this community. We'll review your application and reach out soon.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                "The world needs more people who simply show up and listen."
              </p>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/home")} className="btn-primary mt-4">
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
