import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, BookOpen, ChevronDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const faqs = [
  {
    q: "What is Nirvaha?",
    a: "Nirvaha is an AI-powered mental wellness companion that blends ancient spiritual wisdom with modern therapeutic practices. It helps you reconnect with meaning and cultivate inner balance through guided meditation, journaling, and personalized reflections.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. Your journal entries and reflections are encrypted end-to-end. We never sell your data or share it with third parties. Your healing journey stays completely yours.",
  },
  {
    q: "How does the AI companion work?",
    a: "Nirvaha's AI draws from diverse wisdom traditions — Vedantic philosophy, Buddhist mindfulness, Stoic resilience, and modern psychology — to offer personalized guidance tailored to your emotional state and journey.",
  },
  {
    q: "Can I use Nirvaha offline?",
    a: "Some features like journaling and breathing exercises work offline. Your entries will sync once you're back online. AI-powered features require an internet connection.",
  },
  {
    q: "How do I track my progress?",
    a: "Visit the Wellness tab to see your mood trends, streak milestones, and weekly insights. Your journey is visualized through intuitive charts and personalized summaries.",
  },
];

const HelpSupport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = () => {
    if (!feedback.trim()) return;
    toast({ title: "Thank you 🙏", description: "Your feedback helps us serve your journey better." });
    setFeedback("");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, hsl(var(--cream)) 0%, hsl(var(--cream-warm)) 40%, hsl(var(--sage-light)) 100%)",
      }}
    >
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")}>
          <ArrowLeft size={20} className="text-foreground" />
        </motion.button>
        <h1 className="font-display text-xl font-semibold text-foreground">Help & Support</h1>
      </div>

      <div className="flex-1 px-4 space-y-5 pb-8">
        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/chat")}
            className="glass-card p-4 flex flex-col items-center gap-2"
            style={{ background: "linear-gradient(135deg, hsla(var(--healing-green) / 0.08), hsla(var(--gold) / 0.04))" }}
          >
            <MessageCircle size={20} className="text-primary" />
            <span className="font-body text-xs font-medium text-foreground">Chat with Nirvaha</span>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="glass-card p-4 flex flex-col items-center gap-2"
            style={{ background: "linear-gradient(135deg, hsla(var(--gold) / 0.08), hsla(var(--sage) / 0.04))" }}
          >
            <Mail size={20} className="text-accent-foreground" />
            <span className="font-body text-xs font-medium text-foreground">Email Support</span>
          </motion.button>
        </motion.div>

        {/* FAQs */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-2 mb-2 px-1">
            <BookOpen size={14} className="text-muted-foreground" />
            <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground">
              Frequently Asked Questions
            </p>
          </div>
          <div className="glass-card overflow-hidden">
            <Accordion type="single" collapsible className="divide-y divide-border/50">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-none">
                  <AccordionTrigger className="px-4 py-3.5 font-body text-sm text-foreground hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3.5 font-body text-xs text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Feedback */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <p className="font-body text-[10px] uppercase tracking-widest text-muted-foreground mb-2 px-1">
            Share Feedback
          </p>
          <div className="glass-card p-4 space-y-3">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="How can we improve your journey?"
              className="border-border/50 font-body text-sm min-h-[80px] bg-transparent"
            />
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSendFeedback}
              className="w-full py-3 rounded-2xl font-body text-sm font-medium text-primary-foreground bg-primary"
            >
              Send Feedback
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center font-body text-xs text-muted-foreground">
          Nirvaha v1.0 · Made with 🙏
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
