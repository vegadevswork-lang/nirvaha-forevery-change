export interface SoundTrack {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  moodTag: string;
  icon: string;
}

export interface WellnessPackage {
  id: string;
  title: string;
  purpose: string;
  description: string;
  duration: string;
  trackCount: number;
  icon: string;
  gradient: string;
}

export const recommendations = [
  { id: "rec-1", label: "Calm Down", icon: "🌊", duration: "8 min", mood: "Anxious" },
  { id: "rec-2", label: "Focus Reset", icon: "🎯", duration: "12 min", mood: "Scattered" },
  { id: "rec-3", label: "Sleep Ease", icon: "🌙", duration: "20 min", mood: "Restless" },
  { id: "rec-4", label: "Emotional Release", icon: "🕊️", duration: "15 min", mood: "Heavy" },
  { id: "rec-5", label: "Morning Balance", icon: "🌅", duration: "10 min", mood: "Waking" },
];

export const soundCategories = [
  {
    id: "binaural",
    title: "Binaural Tones",
    description: "Precision frequencies for deep mental states",
    moodTag: "Focus & Clarity",
    trackCount: 12,
    icon: "🔊",
  },
  {
    id: "mantras",
    title: "Mantras",
    description: "Sacred chants from ancient traditions",
    moodTag: "Spiritual Balance",
    trackCount: 18,
    icon: "🕉️",
  },
  {
    id: "nature",
    title: "Nature Healing",
    description: "Immersive natural soundscapes for grounding",
    moodTag: "Calm & Ground",
    trackCount: 15,
    icon: "🌿",
  },
  {
    id: "frequency",
    title: "Frequency Baths",
    description: "432Hz, 528Hz, and Solfeggio tones",
    moodTag: "Deep Healing",
    trackCount: 10,
    icon: "〰️",
  },
  {
    id: "breath",
    title: "Breath + Sound",
    description: "Guided breathwork with healing audio layers",
    moodTag: "Reset & Restore",
    trackCount: 8,
    icon: "🌬️",
  },
  {
    id: "grounding",
    title: "Grounding Audio",
    description: "Low-frequency sounds to anchor your energy",
    moodTag: "Stability",
    trackCount: 9,
    icon: "🪨",
  },
  {
    id: "sleep",
    title: "Sleep Soundscapes",
    description: "Drift into deep, restful sleep",
    moodTag: "Rest & Recovery",
    trackCount: 14,
    icon: "🌙",
  },
  {
    id: "focus",
    title: "Deep Focus Audio",
    description: "Sustained concentration through sound design",
    moodTag: "Productivity",
    trackCount: 11,
    icon: "🧠",
  },
];

export const wellnessPackages: WellnessPackage[] = [
  {
    id: "pregnancy",
    title: "Pregnancy Care",
    purpose: "Supportive wellness for expecting mothers",
    description: "Gentle frequencies and nurturing sounds designed to support calm, comfort, and emotional balance during pregnancy.",
    duration: "7-day journey",
    trackCount: 14,
    icon: "🤰",
    gradient: "linear-gradient(135deg, hsl(330 30% 85%), hsl(280 25% 80%))",
  },
  {
    id: "exam",
    title: "Exam Focus",
    purpose: "Sharpen concentration for peak performance",
    description: "Binaural beats and focus frequencies crafted to enhance memory retention, clarity, and sustained attention.",
    duration: "5-day journey",
    trackCount: 10,
    icon: "📚",
    gradient: "linear-gradient(135deg, hsl(210 40% 82%), hsl(190 35% 78%))",
  },
  {
    id: "employee",
    title: "Employee Balance",
    purpose: "Restore calm in a busy workday",
    description: "Quick sound resets and stress-relief audio designed for professionals seeking balance between meetings and deadlines.",
    duration: "5-day journey",
    trackCount: 10,
    icon: "💼",
    gradient: "linear-gradient(135deg, hsl(152 30% 80%), hsl(140 25% 75%))",
  },
  {
    id: "emotional",
    title: "Emotional Harmony",
    purpose: "Process and release emotional weight",
    description: "A curated sound journey for emotional healing — from release to acceptance to inner peace.",
    duration: "7-day journey",
    trackCount: 14,
    icon: "💚",
    gradient: "linear-gradient(135deg, hsl(42 50% 85%), hsl(35 40% 80%))",
  },
  {
    id: "sleep-recovery",
    title: "Sleep Recovery",
    purpose: "Rebuild your sleep rhythm naturally",
    description: "Progressive sound sessions that ease your body and mind into deep, restorative sleep patterns.",
    duration: "7-day journey",
    trackCount: 14,
    icon: "🌙",
    gradient: "linear-gradient(135deg, hsl(240 25% 82%), hsl(260 20% 78%))",
  },
  {
    id: "anxiety",
    title: "Anxiety Relief",
    purpose: "Gentle grounding when anxiety rises",
    description: "Low-frequency grounding audio and guided breath-sound sessions to calm your nervous system.",
    duration: "5-day journey",
    trackCount: 10,
    icon: "🫧",
    gradient: "linear-gradient(135deg, hsl(180 30% 82%), hsl(160 25% 78%))",
  },
];

export const sampleTracks: SoundTrack[] = [
  { id: "t1", title: "Ocean Theta Waves", description: "Deep relaxation binaural tones", category: "binaural", duration: "12 min", moodTag: "Calm", icon: "🌊" },
  { id: "t2", title: "Om Namah Shivaya", description: "Sacred mantra for inner peace", category: "mantras", duration: "15 min", moodTag: "Spiritual", icon: "🕉️" },
  { id: "t3", title: "Forest Rain", description: "Gentle rain on forest canopy", category: "nature", duration: "20 min", moodTag: "Grounded", icon: "🌧️" },
  { id: "t4", title: "528Hz Love Frequency", description: "The miracle tone for healing", category: "frequency", duration: "10 min", moodTag: "Healing", icon: "💚" },
  { id: "t5", title: "4-7-8 Breath Flow", description: "Calming breath with ambient tones", category: "breath", duration: "8 min", moodTag: "Reset", icon: "🌬️" },
  { id: "t6", title: "Earth Pulse", description: "Schumann resonance grounding", category: "grounding", duration: "15 min", moodTag: "Stable", icon: "🪨" },
];
