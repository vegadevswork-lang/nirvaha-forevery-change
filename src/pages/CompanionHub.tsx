import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Briefcase, Heart, Compass, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import MentorCard from "@/components/companion/MentorCard";
import SpiritualGuideCard from "@/components/companion/SpiritualGuideCard";
import { mentors, spiritualGuides, mentorDomains } from "@/data/companionData";

const domainIcons: Record<string, any> = {
  career: Briefcase,
  relationship: Heart,
  purpose: Compass,
  emotional: Brain,
};

const CompanionHub = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"mentors" | "spiritual">("mentors");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentors = mentors.filter(m => {
    if (selectedDomain && m.domain !== selectedDomain) return false;
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredGuides = spiritualGuides.filter(g => {
    if (searchQuery && !g.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !g.tradition.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Top 3 "For You" (simulated AI matching)
  const forYouMentors = mentors.slice(0, 3);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient orbs */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 200, height: 200, top: "5%", right: "-10%", background: "hsl(var(--healing-green))" }}
      />
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 160, height: 160, bottom: "30%", left: "-10%", background: "hsl(var(--gold))", animationDelay: "2s" }}
      />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-5"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center"
            style={{
              background: "hsla(var(--glass-bg))",
              borderColor: "hsla(var(--glass-border))",
            }}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </motion.button>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground">Companion Mode</h1>
            <p className="font-body text-xs text-muted-foreground">Find your guide</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-5"
        >
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mentors, guides, specializations..."
            className="glass-input pl-10"
          />
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="tab-switcher mb-5"
        >
          <button
            className={`tab-item ${activeTab === "mentors" ? "active" : ""}`}
            onClick={() => setActiveTab("mentors")}
          >
            Mentors
          </button>
          <button
            className={`tab-item ${activeTab === "spiritual" ? "active" : ""}`}
            onClick={() => setActiveTab("spiritual")}
          >
            Spiritual Guides
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "mentors" ? (
            <motion.div
              key="mentors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Domain filters */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${
                    !selectedDomain ? "bg-primary text-primary-foreground" : ""
                  }`}
                  style={!selectedDomain ? {} : {
                    background: "hsla(var(--glass-bg))",
                    color: "hsl(var(--muted-foreground))",
                    border: "1px solid hsla(var(--glass-border))",
                  }}
                >
                  All
                </button>
                {mentorDomains.map(d => {
                  const Icon = domainIcons[d.id];
                  const isActive = selectedDomain === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDomain(isActive ? null : d.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${
                        isActive ? "bg-primary text-primary-foreground" : ""
                      }`}
                      style={isActive ? {} : {
                        background: "hsla(var(--glass-bg))",
                        color: "hsl(var(--muted-foreground))",
                        border: "1px solid hsla(var(--glass-border))",
                      }}
                    >
                      <Icon size={12} />
                      {d.label}
                    </button>
                  );
                })}
              </div>

              {/* For You Section */}
              {!selectedDomain && !searchQuery && (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
                    <h3 className="font-display text-sm font-semibold text-foreground">Recommended for You</h3>
                  </div>
                  {forYouMentors.map((m, i) => (
                    <MentorCard key={m.id} mentor={m} index={i} isForYou />
                  ))}
                </div>
              )}

              {/* All mentors */}
              <h3 className="font-display text-sm font-semibold text-foreground mb-3">
                {selectedDomain ? mentorDomains.find(d => d.id === selectedDomain)?.label : "All Mentors"}
              </h3>
              {filteredMentors.length > 0 ? (
                filteredMentors.map((m, i) => (
                  <MentorCard key={m.id} mentor={m} index={i} />
                ))
              ) : (
                <p className="text-center font-body text-sm text-muted-foreground py-8">
                  No mentors found. Try a different search.
                </p>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="spiritual"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Intro text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-4 mb-5"
              >
                <p className="font-body text-xs text-muted-foreground italic leading-relaxed">
                  "Some questions sit deeper than strategy — they're about meaning itself. 
                  Spiritual guides offer companionship for life's biggest questions."
                </p>
                <p className="font-body text-[10px] text-muted-foreground mt-2">
                  ⚠ This is not therapy. It's spiritual companionship for those who seek it.
                </p>
              </motion.div>

              {filteredGuides.length > 0 ? (
                filteredGuides.map((g, i) => (
                  <SpiritualGuideCard key={g.id} guide={g} index={i} />
                ))
              ) : (
                <p className="text-center font-body text-sm text-muted-foreground py-8">
                  No guides found. Try a different search.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav active="Home" onSelect={() => {}} />
    </div>
  );
};

export default CompanionHub;
