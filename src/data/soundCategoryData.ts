import { SoundTrack, WellnessPackage } from "./soundHealingData";

// Expanded tracks per category for the detail pages
export const categoryTracks: Record<string, SoundTrack[]> = {
  binaural: [
    { id: "b1", title: "Ocean Theta Waves", description: "Deep relaxation at 6Hz binaural offset — ideal for unwinding after a long day", category: "binaural", duration: "12 min", moodTag: "Calm", icon: "🌊" },
    { id: "b2", title: "Alpha Focus Stream", description: "10Hz alpha waves to sharpen attention and creative flow", category: "binaural", duration: "15 min", moodTag: "Focus", icon: "🎯" },
    { id: "b3", title: "Delta Sleep Descent", description: "Gentle 2Hz delta frequencies to ease you into deep sleep", category: "binaural", duration: "25 min", moodTag: "Sleep", icon: "🌙" },
    { id: "b4", title: "Gamma Clarity Burst", description: "40Hz gamma stimulation for peak cognitive performance", category: "binaural", duration: "10 min", moodTag: "Clarity", icon: "⚡" },
    { id: "b5", title: "Theta Meditation Bath", description: "Sustained theta waves for deep meditative states", category: "binaural", duration: "20 min", moodTag: "Meditate", icon: "🧘" },
    { id: "b6", title: "Alpha-Theta Crossover", description: "Transition between relaxed awareness and deep insight", category: "binaural", duration: "18 min", moodTag: "Insight", icon: "💫" },
  ],
  mantras: [
    { id: "m1", title: "Om Namah Shivaya", description: "Sacred mantra for inner transformation and peace", category: "mantras", duration: "15 min", moodTag: "Spiritual", icon: "🕉️" },
    { id: "m2", title: "Gayatri Mantra", description: "Ancient Vedic chant for wisdom and enlightenment", category: "mantras", duration: "12 min", moodTag: "Wisdom", icon: "☀️" },
    { id: "m3", title: "Om Mani Padme Hum", description: "Tibetan compassion mantra for heart opening", category: "mantras", duration: "10 min", moodTag: "Compassion", icon: "💚" },
    { id: "m4", title: "So Hum Meditation", description: "Breath-synchronized mantra — 'I am That'", category: "mantras", duration: "14 min", moodTag: "Identity", icon: "🌬️" },
    { id: "m5", title: "Heart Chakra Chant", description: "Anahata activation through resonant toning", category: "mantras", duration: "11 min", moodTag: "Love", icon: "💗" },
    { id: "m6", title: "Crown Chakra Tone", description: "Sahasrara opening frequency for cosmic connection", category: "mantras", duration: "13 min", moodTag: "Transcend", icon: "👑" },
  ],
  nature: [
    { id: "n1", title: "Forest Rain", description: "Gentle rain on a dense forest canopy — deeply grounding", category: "nature", duration: "20 min", moodTag: "Ground", icon: "🌧️" },
    { id: "n2", title: "Ocean Waves at Dawn", description: "Rhythmic ocean surf as the sun rises", category: "nature", duration: "25 min", moodTag: "Peace", icon: "🌅" },
    { id: "n3", title: "Mountain Stream", description: "Crystal-clear water flowing over smooth stones", category: "nature", duration: "18 min", moodTag: "Clarity", icon: "🏔️" },
    { id: "n4", title: "Night Crickets", description: "Ambient evening soundscape for restful sleep", category: "nature", duration: "30 min", moodTag: "Sleep", icon: "🦗" },
    { id: "n5", title: "Wind Through Bamboo", description: "Gentle breeze through a bamboo grove", category: "nature", duration: "15 min", moodTag: "Calm", icon: "🎋" },
  ],
  frequency: [
    { id: "f1", title: "528Hz Love Frequency", description: "The miracle tone — associated with DNA repair and transformation", category: "frequency", duration: "10 min", moodTag: "Healing", icon: "💚" },
    { id: "f2", title: "432Hz Natural Tuning", description: "Harmonize with the natural frequency of the universe", category: "frequency", duration: "15 min", moodTag: "Harmony", icon: "🎵" },
    { id: "f3", title: "396Hz Liberation", description: "Release guilt and fear at the cellular level", category: "frequency", duration: "12 min", moodTag: "Release", icon: "🕊️" },
    { id: "f4", title: "741Hz Awakening", description: "Stimulate intuition and activate inner knowing", category: "frequency", duration: "14 min", moodTag: "Intuition", icon: "🔮" },
    { id: "f5", title: "963Hz Divine Connection", description: "Crown activation — connect with higher consciousness", category: "frequency", duration: "10 min", moodTag: "Divine", icon: "✨" },
  ],
  breath: [
    { id: "br1", title: "4-7-8 Breath Flow", description: "Calming breath with ambient tones — anxiety relief", category: "breath", duration: "8 min", moodTag: "Reset", icon: "🌬️" },
    { id: "br2", title: "Box Breathing + Tone", description: "4-4-4-4 structured breath with gentle frequency", category: "breath", duration: "10 min", moodTag: "Balance", icon: "📦" },
    { id: "br3", title: "Ocean Breath Sync", description: "Ujjayi breathing matched with ocean wave rhythms", category: "breath", duration: "12 min", moodTag: "Flow", icon: "🌊" },
    { id: "br4", title: "Energizing Breath", description: "Kapalbhati rhythm with uplifting tones", category: "breath", duration: "6 min", moodTag: "Energy", icon: "⚡" },
  ],
  grounding: [
    { id: "g1", title: "Earth Pulse 7.83Hz", description: "Schumann resonance — the Earth's natural heartbeat", category: "grounding", duration: "15 min", moodTag: "Stable", icon: "🪨" },
    { id: "g2", title: "Root Chakra Tone", description: "Deep 256Hz grounding frequency for security", category: "grounding", duration: "12 min", moodTag: "Rooted", icon: "🌳" },
    { id: "g3", title: "Body Scan with Bass", description: "Low-frequency sweep through the body for release", category: "grounding", duration: "18 min", moodTag: "Release", icon: "🫧" },
    { id: "g4", title: "Tibetan Bowl Ground", description: "Deep singing bowl resonance for centering", category: "grounding", duration: "14 min", moodTag: "Center", icon: "🔔" },
  ],
  sleep: [
    { id: "s1", title: "Deep Sleep Delta", description: "2Hz delta waves for the deepest restorative sleep", category: "sleep", duration: "30 min", moodTag: "Deep Sleep", icon: "🌙" },
    { id: "s2", title: "Lullaby Frequencies", description: "Gentle descending tones that mimic the journey to sleep", category: "sleep", duration: "25 min", moodTag: "Drift", icon: "⭐" },
    { id: "s3", title: "Rain on Tin Roof", description: "Cozy rain sounds — like being safe indoors", category: "sleep", duration: "45 min", moodTag: "Comfort", icon: "🏠" },
    { id: "s4", title: "Ocean Night Drift", description: "Distant waves under a starlit sky", category: "sleep", duration: "35 min", moodTag: "Peace", icon: "🌌" },
  ],
  focus: [
    { id: "fo1", title: "Gamma Study Flow", description: "40Hz gamma for sustained concentration and learning", category: "focus", duration: "20 min", moodTag: "Study", icon: "📚" },
    { id: "fo2", title: "Lo-Fi Frequency Blend", description: "Ambient focus frequencies with warm undertones", category: "focus", duration: "25 min", moodTag: "Creative", icon: "🎧" },
    { id: "fo3", title: "Alpha Work Mode", description: "10Hz alpha for relaxed but alert productivity", category: "focus", duration: "15 min", moodTag: "Productive", icon: "💻" },
    { id: "fo4", title: "Deep Work Immersion", description: "Layered tones designed for 90-minute deep work sessions", category: "focus", duration: "30 min", moodTag: "Immerse", icon: "🧠" },
  ],
};

// Journey sessions for each wellness package
export interface JourneySession {
  id: string;
  day: number;
  title: string;
  description: string;
  duration: string;
  trackId: string;
  icon: string;
}

export const journeySessions: Record<string, JourneySession[]> = {
  pregnancy: [
    { id: "p-1", day: 1, title: "Welcoming Calm", description: "Begin with gentle frequencies to create a nurturing inner space", duration: "12 min", trackId: "528hz", icon: "🌸" },
    { id: "p-2", day: 2, title: "Heartbeat Harmony", description: "Sync with your baby's rhythm through soft pulsing tones", duration: "15 min", trackId: "heart-chakra", icon: "💓" },
    { id: "p-3", day: 3, title: "Body Comfort", description: "Low-frequency resonance for physical ease and comfort", duration: "14 min", trackId: "earth-pulse", icon: "🤗" },
    { id: "p-4", day: 4, title: "Emotional Balance", description: "Gentle mantras for emotional steadiness", duration: "10 min", trackId: "om-tone", icon: "💚" },
    { id: "p-5", day: 5, title: "Deep Rest", description: "Guided sleep frequencies for restorative rest", duration: "20 min", trackId: "delta-waves", icon: "🌙" },
    { id: "p-6", day: 6, title: "Bonding Meditation", description: "Heart-opening tones for mother-baby connection", duration: "15 min", trackId: "528hz", icon: "👶" },
    { id: "p-7", day: 7, title: "Joyful Preparation", description: "Uplifting frequencies to welcome the journey ahead", duration: "12 min", trackId: "432hz", icon: "🌅" },
  ],
  exam: [
    { id: "e-1", day: 1, title: "Focus Activation", description: "Prime your brain with gamma frequencies for peak study", duration: "10 min", trackId: "gamma-focus", icon: "🎯" },
    { id: "e-2", day: 2, title: "Memory Boost", description: "Alpha waves to enhance information retention", duration: "15 min", trackId: "alpha-waves", icon: "🧠" },
    { id: "e-3", day: 3, title: "Stress Reset", description: "Quick calming session between study blocks", duration: "8 min", trackId: "theta-waves", icon: "🌊" },
    { id: "e-4", day: 4, title: "Deep Study Immersion", description: "Extended focus frequencies for long study sessions", duration: "25 min", trackId: "gamma-focus", icon: "📚" },
    { id: "e-5", day: 5, title: "Exam Day Calm", description: "Grounding tones to manage pre-exam anxiety", duration: "10 min", trackId: "earth-pulse", icon: "🍃" },
  ],
  employee: [
    { id: "em-1", day: 1, title: "Morning Clarity", description: "Start your workday with focused alpha waves", duration: "8 min", trackId: "alpha-waves", icon: "☀️" },
    { id: "em-2", day: 2, title: "Meeting Recovery", description: "Quick stress reset between meetings", duration: "5 min", trackId: "theta-waves", icon: "🔄" },
    { id: "em-3", day: 3, title: "Creative Flow", description: "Unlock creative thinking with theta-alpha crossover", duration: "12 min", trackId: "alpha-waves", icon: "💡" },
    { id: "em-4", day: 4, title: "Midday Recharge", description: "Energizing frequencies for the afternoon slump", duration: "8 min", trackId: "gamma-focus", icon: "⚡" },
    { id: "em-5", day: 5, title: "Evening Unwind", description: "Release work tension with grounding tones", duration: "15 min", trackId: "earth-pulse", icon: "🌅" },
  ],
  emotional: [
    { id: "emo-1", day: 1, title: "Acknowledge & Accept", description: "Gentle frequencies to sit with your emotions without judgment", duration: "12 min", trackId: "528hz", icon: "🫂" },
    { id: "emo-2", day: 2, title: "Release & Let Go", description: "396Hz liberation tone for emotional clearing", duration: "14 min", trackId: "396hz", icon: "🕊️" },
    { id: "emo-3", day: 3, title: "Heart Opening", description: "Heart chakra activation for self-compassion", duration: "15 min", trackId: "heart-chakra", icon: "💚" },
    { id: "emo-4", day: 4, title: "Grief & Healing", description: "Gentle sound bath for processing deep feelings", duration: "18 min", trackId: "432hz", icon: "🌧️" },
    { id: "emo-5", day: 5, title: "Inner Strength", description: "Root chakra grounding for emotional resilience", duration: "12 min", trackId: "earth-pulse", icon: "🪨" },
    { id: "emo-6", day: 6, title: "Joy Restoration", description: "Uplifting frequencies to rediscover lightness", duration: "10 min", trackId: "528hz", icon: "🌈" },
    { id: "emo-7", day: 7, title: "Integration & Peace", description: "Complete your journey with harmonizing tones", duration: "15 min", trackId: "432hz", icon: "🙏" },
  ],
  "sleep-recovery": [
    { id: "sr-1", day: 1, title: "Sleep Hygiene Reset", description: "Calibrate your body clock with theta waves", duration: "15 min", trackId: "theta-waves", icon: "🛏️" },
    { id: "sr-2", day: 2, title: "Tension Release", description: "Body scan with low-frequency grounding", duration: "18 min", trackId: "earth-pulse", icon: "🫧" },
    { id: "sr-3", day: 3, title: "Dream Preparation", description: "Theta-delta transition for vivid, restful dreams", duration: "20 min", trackId: "theta-waves", icon: "💭" },
    { id: "sr-4", day: 4, title: "Deep Delta Dive", description: "Sustained delta waves for the deepest sleep phase", duration: "25 min", trackId: "delta-waves", icon: "🌙" },
    { id: "sr-5", day: 5, title: "Rain Sleep Cocoon", description: "Natural rain sounds layered with sleep frequencies", duration: "30 min", trackId: "rain", icon: "🌧️" },
    { id: "sr-6", day: 6, title: "Ocean Night", description: "Ocean waves carrying you into restful sleep", duration: "25 min", trackId: "ocean", icon: "🌊" },
    { id: "sr-7", day: 7, title: "Renewed Morning", description: "Wake gently with rising alpha frequencies", duration: "10 min", trackId: "alpha-waves", icon: "🌅" },
  ],
  anxiety: [
    { id: "a-1", day: 1, title: "Grounding Breath", description: "4-7-8 breathing with earth-frequency tones", duration: "8 min", trackId: "earth-pulse", icon: "🌬️" },
    { id: "a-2", day: 2, title: "Nervous System Calm", description: "Vagus nerve soothing through specific frequencies", duration: "12 min", trackId: "432hz", icon: "🧘" },
    { id: "a-3", day: 3, title: "Safe Space Sound", description: "Enveloping tones that create a sense of safety", duration: "15 min", trackId: "528hz", icon: "🏡" },
    { id: "a-4", day: 4, title: "Thought Release", description: "Binaural beats to quiet the racing mind", duration: "14 min", trackId: "theta-waves", icon: "🍃" },
    { id: "a-5", day: 5, title: "Resilience Building", description: "Grounding frequencies for lasting emotional stability", duration: "12 min", trackId: "earth-pulse", icon: "🪨" },
  ],
};
