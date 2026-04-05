import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Globe, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      "**Account Information**: When you create an account, we collect your name, email address, and optional phone number.",
      "**Wellness Data**: Journal entries, mood logs, meditation progress, and self-reflection content you voluntarily provide.",
      "**Usage Data**: App interaction patterns, feature usage frequency, and session duration to improve your experience.",
      "**Device Information**: Device type, operating system, and browser type for compatibility and performance optimization.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use Your Data",
    content: [
      "Personalize your wellness journey and content recommendations.",
      "Provide AI-powered insights based on your mood patterns and reflections.",
      "Improve app features, performance, and user experience.",
      "Send optional notifications about your wellness streaks and milestones.",
      "We **never** sell your personal data to third parties.",
    ],
  },
  {
    icon: Shield,
    title: "Data Protection & Security",
    content: [
      "All journal entries and personal reflections are encrypted end-to-end.",
      "We use industry-standard TLS encryption for data in transit.",
      "Access to user data is restricted to authorized personnel only.",
      "Regular security audits and vulnerability assessments are conducted.",
      "Community posts are anonymized — no personal identifiers are attached.",
    ],
  },
  {
    icon: Eye,
    title: "Your Privacy Controls",
    content: [
      "**Analytics opt-out**: Disable usage analytics at any time from Privacy & Data settings.",
      "**Personalization toggle**: Control whether your data is used for content recommendations.",
      "**Data export**: Download all your data (journal entries, mood logs, reflections) in a portable format.",
      "**Account deletion**: Request complete deletion of your account and all associated data.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "**Right to Access**: Request a copy of all personal data we hold about you.",
      "**Right to Rectification**: Correct any inaccurate personal information.",
      "**Right to Erasure**: Request deletion of your personal data at any time.",
      "**Right to Portability**: Receive your data in a structured, machine-readable format.",
      "**Right to Object**: Opt out of data processing for specific purposes.",
    ],
  },
  {
    icon: Globe,
    title: "Cookies & Tracking",
    content: [
      "We use essential cookies to maintain your session and preferences.",
      "Optional analytics cookies help us understand app usage patterns.",
      "We do **not** use third-party advertising or tracking cookies.",
      "You can manage cookie preferences through your browser settings.",
    ],
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    content: [
      "For privacy-related inquiries, reach us at **privacy@nirvaha.app**.",
      "We will notify you of any material changes to this policy via email or in-app notification.",
      "This policy was last updated on **April 5, 2026**.",
    ],
  },
];

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 220, height: 220, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, bottom: "30%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      {/* Header */}
      <div className="sticky top-0 z-30 px-5 pt-10 pb-3" style={{ background: "linear-gradient(to bottom, hsl(var(--background)), transparent)" }}>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ background: "hsla(var(--glass-bg))", border: "1px solid hsla(var(--glass-border))" }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <h1 className="font-display text-lg text-foreground font-semibold">Privacy Policy</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-12 relative z-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-5"
          style={{ background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.08), hsla(var(--gold) / 0.05))", border: "1px solid hsla(var(--glass-border))" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-primary" />
            <p className="font-display text-sm font-semibold text-foreground">Nirvaha's Privacy Promise</p>
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            Your inner world is sacred. At Nirvaha, we believe your wellness journey is deeply personal. This policy explains how we collect, use, and protect your information — with full transparency and respect for your autonomy.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * si }}
            className="mb-5"
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "hsl(var(--primary) / 0.1)" }}
              >
                <section.icon size={14} className="text-primary" />
              </div>
              <h2 className="font-display text-sm font-semibold text-foreground">{section.title}</h2>
            </div>
            <div className="rounded-2xl p-4 space-y-2.5" style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border) / 0.5)" }}>
              {section.content.map((item, i) => (
                <p key={i} className="font-body text-xs text-muted-foreground leading-relaxed pl-3" style={{ borderLeft: "2px solid hsl(var(--primary) / 0.2)" }}>
                  {renderBold(item)}
                </p>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center py-6"
        >
          <p className="font-display text-sm text-muted-foreground italic">"Your healing journey stays yours"</p>
          <p className="font-body text-[10px] text-muted-foreground mt-1 opacity-60">Effective April 5, 2026 · Nirvaha Wellness</p>
        </motion.div>
      </div>
    </div>
  );
};

/** Render **bold** markdown in text */
function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-semibold text-foreground">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default PrivacyPolicy;
