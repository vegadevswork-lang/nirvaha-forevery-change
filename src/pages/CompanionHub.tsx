import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Briefcase, Heart, Compass, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import MentorCard from "@/components/companion/MentorCard";
import { mentors, mentorDomains } from "@/data/companionData";
import { usePageLoading } from "@/hooks/use-page-loading";
import CompanionSkeleton from "@/components/skeletons/CompanionSkeleton";

const domainIcons: Record<string, any> = {
  career: Briefcase,
  relationship: Heart,
  purpose: Compass,
  emotional: Brain,
};

const CompanionHub = () => {
  const navigate = useNavigate();
  const isLoading = usePageLoading(600);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMentors = mentors.filter(m => {
    if (selectedDomain && m.domain !== selectedDomain) return false;
    if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !m.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
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
            placeholder="Search mentors, specializations..."
            className="glass-input pl-10"
          />
        </motion.div>

        {/* Domain filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none"
        >
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
        </motion.div>

        {/* For You Section */}
        {!selectedDomain && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
              <h3 className="font-display text-sm font-semibold text-foreground">Recommended for You</h3>
            </div>
            {forYouMentors.map((m, i) => (
              <MentorCard key={m.id} mentor={m} index={i} isForYou />
            ))}
          </motion.div>
        )}

        {/* All mentors */}
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">
          {selectedDomain ? mentorDomains.find(d => d.id === selectedDomain)?.label : "All Companions"}
        </h3>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain || "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {filteredMentors.length > 0 ? (
              filteredMentors.map((m, i) => (
                <MentorCard key={m.id} mentor={m} index={i} />
              ))
            ) : (
              <p className="text-center font-body text-sm text-muted-foreground py-8">
                No companions found. Try a different search.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active="Home" onSelect={() => {}} />
    </div>
  );
};

export default CompanionHub;
