import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Briefcase, Heart, Compass, Brain, Sparkles, Star, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/home/BottomNav";
import { mentors, mentorDomains } from "@/data/companionData";

const domainIcons: Record<string, any> = {
  career: Briefcase,
  relationship: Heart,
  purpose: Compass,
  emotional: Brain,
};

const CompanionHub = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24 px-5 pt-14 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <h1 className="font-display text-2xl font-semibold text-foreground">Companion Mode</h1>
          <p className="font-body text-xs text-muted-foreground mt-1">Trusted guides for your inner journey</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or specialization..."
            className="glass-input pl-10"
          />
        </div>

        {/* Domain filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-5 no-scrollbar">
          <button
            onClick={() => setSelectedDomain(null)}
            className="px-3.5 py-2 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all"
            style={{
              background: !selectedDomain ? "hsl(var(--primary))" : "hsl(var(--muted))",
              color: !selectedDomain ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
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
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-body font-semibold whitespace-nowrap transition-all"
                style={{
                  background: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
                  color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                <Icon size={12} />
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Recommended For You — horizontal scroll */}
        {!selectedDomain && !searchQuery && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} style={{ color: "hsl(var(--gold))" }} />
              <h2 className="font-display text-sm font-semibold text-foreground">Recommended for You</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
              {forYouMentors.map((m) => (
                <div
                  key={m.id}
                  className="flex-shrink-0 w-[170px] rounded-2xl p-4 cursor-pointer active:scale-[0.97] transition-transform"
                  style={{ background: m.avatarGradient }}
                  onClick={() => navigate(`/companion/mentor/${m.id}`)}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2.5">
                    <span className="text-xs font-display font-bold text-white">
                      {m.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white leading-tight">{m.name}</h3>
                  <p className="font-body text-[10px] text-white/70 mt-0.5 line-clamp-1">{m.title}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star size={10} className="fill-current text-white/90" />
                    <span className="text-[10px] font-body text-white/90 font-semibold">{m.rating}</span>
                  </div>
                  <span className="inline-block mt-2 text-[9px] font-body px-2 py-0.5 rounded-full bg-white/15 text-white/85">
                    {m.specializations[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Companions list */}
        <div className="mb-3">
          <h2 className="font-display text-sm font-semibold text-foreground">
            {selectedDomain ? mentorDomains.find(d => d.id === selectedDomain)?.label : "All Companions"}
          </h2>
          <p className="font-body text-[11px] text-muted-foreground mt-0.5">
            {filteredMentors.length} companion{filteredMentors.length !== 1 ? "s" : ""} available
          </p>
        </div>

        <div className="space-y-1.5">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-colors active:bg-muted/50 hover:bg-muted/30"
                onClick={() => navigate(`/companion/mentor/${m.id}`)}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: m.avatarGradient }}
                >
                  <span className="text-xs font-display font-bold text-white">
                    {m.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[14px] font-semibold text-foreground leading-tight truncate">{m.name}</h3>
                  <p className="font-body text-[11px] text-muted-foreground mt-0.5 truncate">{m.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-0.5 text-[11px] font-body">
                      <Star size={10} className="fill-current" style={{ color: "hsl(var(--gold))" }} />
                      <span className="text-foreground font-semibold">{m.rating}</span>
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full" style={{ background: "hsl(var(--muted-foreground))" }} />
                    <span className="text-[10px] font-body text-muted-foreground">{m.nextAvailable}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/40 flex-shrink-0" />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="font-body text-sm text-muted-foreground">No companions found</p>
              <p className="font-body text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CompanionHub;
