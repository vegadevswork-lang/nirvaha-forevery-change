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

  const forYouMentors = mentors.slice(0, 3);

  if (isLoading) return <CompanionSkeleton />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Subtle ambient */}
      <div
        className="ambient-orb animate-pulse-soft"
        style={{ width: 180, height: 180, top: "4%", right: "-12%", background: "hsl(var(--healing-green))", opacity: 0.4 }}
      />

      <div className="flex-1 overflow-y-auto pb-28 px-5 pt-14 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
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
            <h1 className="font-display text-xl font-semibold text-foreground">Find Your Guide</h1>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Trusted companions for your journey</p>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="relative mb-5"
        >
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or specialization..."
            className="glass-input pl-10"
          />
        </motion.div>

        {/* Domain filters — pill style */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none"
        >
          <button
            onClick={() => setSelectedDomain(null)}
            className={`px-3.5 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${
              !selectedDomain ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/50 text-muted-foreground"
            }`}
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
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-body font-medium whitespace-nowrap transition-all ${
                  isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/50 text-muted-foreground"
                }`}
              >
                <Icon size={12} />
                {d.label}
              </button>
            );
          })}
        </motion.div>

        {/* For You — horizontal scroll cards */}
        {!selectedDomain && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
              <h2 className="font-display text-sm font-semibold text-foreground">Recommended for You</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
              {forYouMentors.map((m, i) => (
                <MentorCard key={m.id} mentor={m} index={i} compact />
              ))}
            </div>
          </motion.div>
        )}

        {/* All companions — clean list */}
        <div className="mb-4">
          <h2 className="font-display text-sm font-semibold text-foreground">
            {selectedDomain ? mentorDomains.find(d => d.id === selectedDomain)?.label : "All Companions"}
          </h2>
          <p className="font-body text-[11px] text-muted-foreground mt-0.5">
            {filteredMentors.length} companion{filteredMentors.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDomain || "all"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-1"
          >
            {filteredMentors.length > 0 ? (
              filteredMentors.map((m, i) => (
                <MentorCard key={m.id} mentor={m} index={i} />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="font-body text-sm text-muted-foreground">No companions found</p>
                <p className="font-body text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active="Home" onSelect={() => {}} />
    </div>
  );
};

export default CompanionHub;
