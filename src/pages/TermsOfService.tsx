import { motion } from "framer-motion";
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, Ban, CreditCard, RefreshCw, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Nirvaha, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, please do not use our services.",
      "We may update these terms from time to time. Continued use constitutes acceptance of any changes.",
      "You must be at least 13 years of age to use Nirvaha. Users under 18 require parental consent.",
    ],
  },
  {
    icon: Users,
    title: "Your Account",
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You agree to provide accurate and complete information when creating your account.",
      "You are responsible for all activities that occur under your account.",
      "Notify us immediately if you suspect unauthorized access to your account.",
      "Guest access provides limited features; creating an account unlocks your full wellness journey.",
    ],
  },
  {
    icon: Scale,
    title: "Acceptable Use",
    content: [
      "Use Nirvaha for personal wellness, self-reflection, and emotional growth.",
      "Community interactions must be respectful, empathetic, and supportive.",
      "Share authentic experiences — community spaces are for genuine expression, not promotion.",
      "Respect the anonymity and privacy of other community members.",
      "Do not use AI chat features to seek emergency medical or crisis intervention advice.",
    ],
  },
  {
    icon: Ban,
    title: "Prohibited Conduct",
    content: [
      "Harassing, bullying, or targeting other users in community spaces.",
      "Posting harmful, abusive, discriminatory, or misleading content.",
      "Attempting to access other users' private data or accounts.",
      "Using automated tools (bots, scrapers) to access or collect data from Nirvaha.",
      "Impersonating Nirvaha staff, companions, or other users.",
      "Sharing content that promotes self-harm or dangerous activities.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Wellness Disclaimer",
    content: [
      "Nirvaha is a **wellness and self-reflection tool**, not a substitute for professional medical, psychological, or psychiatric advice.",
      "AI-powered features provide general wellness guidance and should not be treated as professional therapy or diagnosis.",
      "Companion mentors offer peer support and guidance, not licensed clinical services.",
      "If you are experiencing a mental health crisis, please contact emergency services or a licensed professional immediately.",
      "Content and recommendations are for informational and reflective purposes only.",
    ],
  },
  {
    icon: CreditCard,
    title: "Intellectual Property",
    content: [
      "All content, design, and technology within Nirvaha are owned by or licensed to Nirvaha Wellness.",
      "You retain ownership of your personal content (journal entries, reflections, community posts).",
      "By posting in community spaces, you grant Nirvaha a license to display your anonymized content within the platform.",
      "You may not reproduce, distribute, or create derivative works from Nirvaha's proprietary content.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Termination & Suspension",
    content: [
      "We may suspend or terminate your account for violations of these terms.",
      "You may delete your account at any time through Privacy & Data settings.",
      "Upon termination, your personal data will be deleted in accordance with our Privacy Policy.",
      "Community content you've posted may be retained in anonymized form after account deletion.",
    ],
  },
  {
    icon: Gavel,
    title: "Limitation of Liability",
    content: [
      "Nirvaha is provided \"as is\" without warranties of any kind, express or implied.",
      "We are not liable for any damages arising from your use of or inability to use Nirvaha.",
      "Our total liability shall not exceed the amount you have paid for premium services, if any.",
      "These terms are governed by applicable laws. Any disputes shall be resolved through good-faith negotiation first.",
    ],
  },
];

const TermsOfService = () => {
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
          <h1 className="font-display text-lg text-foreground font-semibold">Terms of Service</h1>
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
            <FileText size={18} className="text-primary" />
            <p className="font-display text-sm font-semibold text-foreground">Welcome to Nirvaha</p>
          </div>
          <p className="font-body text-xs text-muted-foreground leading-relaxed">
            These Terms of Service govern your use of Nirvaha — a wellness sanctuary designed for self-reflection, emotional growth, and community support. Please read them carefully. By using Nirvaha, you agree to these terms.
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
          <p className="font-display text-sm text-muted-foreground italic">"Your space, your pace, your terms"</p>
          <p className="font-body text-[10px] text-muted-foreground mt-1 opacity-60">Effective April 5, 2026 · Nirvaha Wellness</p>
        </motion.div>
      </div>
    </div>
  );
};

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

export default TermsOfService;
