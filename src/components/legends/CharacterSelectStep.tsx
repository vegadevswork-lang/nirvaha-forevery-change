import { motion } from "framer-motion";

interface Character {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

const characters: Character[] = [
  { id: "rama", name: "Lord Rama", emoji: "🏹", category: "Divine & Spiritual" },
  { id: "krishna", name: "Lord Krishna", emoji: "🪈", category: "Divine & Spiritual" },
  { id: "buddha", name: "Buddha", emoji: "🪷", category: "Divine & Spiritual" },
  { id: "shivaji", name: "Shivaji Maharaj", emoji: "⚔️", category: "Historical Legends" },
  { id: "pratap", name: "Maharana Pratap", emoji: "🛡️", category: "Historical Legends" },
  { id: "yogi", name: "Yoga Master", emoji: "🧘", category: "Modern Wellness" },
  { id: "guru", name: "Meditation Guide", emoji: "✨", category: "Modern Wellness" },
  { id: "sage", name: "Ancient Sage", emoji: "📿", category: "Divine & Spiritual" },
];

const categories = ["Divine & Spiritual", "Historical Legends", "Modern Wellness"];

interface Props {
  selected: string | null;
  onSelect: (id: string) => void;
  onGenerate: () => void;
  userPhoto: string | null;
}

const CharacterSelectStep = ({ selected, onSelect, onGenerate, userPhoto }: Props) => (
  <div className="px-5 pb-32">
    <h1 className="font-display text-2xl text-foreground font-semibold mb-1">
      Choose Your Legend
    </h1>
    <p className="font-body text-sm text-muted-foreground mb-6">
      Select a figure to create your Nirvaha selfie with.
    </p>

    {/* User photo thumbnail */}
    {userPhoto && (
      <div className="flex items-center gap-3 mb-6">
        <img src={userPhoto} alt="You" className="w-12 h-12 rounded-2xl object-cover border-2" style={{ borderColor: "hsl(var(--primary))" }} />
        <div>
          <p className="font-body text-sm text-foreground font-medium">Your photo</p>
          <p className="font-body text-xs text-muted-foreground">Ready to merge</p>
        </div>
      </div>
    )}

    {categories.map((cat) => (
      <div key={cat} className="mb-5">
        <h3 className="font-display text-sm text-muted-foreground font-medium mb-3 tracking-wide uppercase">
          {cat}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {characters
            .filter((c) => c.category === cat)
            .map((char, i) => {
              const isSelected = selected === char.id;
              return (
                <motion.button
                  key={char.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onSelect(char.id)}
                  className="glass-card p-4 text-left transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderColor: isSelected ? "hsl(var(--accent))" : undefined,
                    boxShadow: isSelected
                      ? "0 0 0 2px hsl(var(--accent)), 0 8px 24px hsla(var(--gold) / 0.15)"
                      : undefined,
                  }}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="character-glow"
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, hsla(var(--gold) / 0.08), hsla(var(--healing-green) / 0.05))",
                      }}
                    />
                  )}
                  <span className="text-2xl mb-2 block">{char.emoji}</span>
                  <p className="font-body text-sm text-foreground font-medium relative z-10">{char.name}</p>
                </motion.button>
              );
            })}
        </div>
      </div>
    ))}

    {/* Sticky generate button */}
    <div className="fixed bottom-0 left-0 right-0 p-5 z-30" style={{ background: "linear-gradient(to top, hsl(var(--background)) 70%, transparent)" }}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onGenerate}
        disabled={!selected}
        className="btn-primary disabled:opacity-40 disabled:pointer-events-none"
      >
        Generate Nirvaha Selfie
      </motion.button>
    </div>
  </div>
);

export default CharacterSelectStep;
