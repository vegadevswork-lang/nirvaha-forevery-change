export const emotions = [
  { label: "Lost", emoji: "🌫️", color: "200 20% 60%", path: "compassion" },
  { label: "Overwhelmed", emoji: "🌊", color: "220 40% 55%", path: "compassion" },
  { label: "Calm", emoji: "🍃", color: "152 35% 45%", path: "clarity" },
  { label: "Anxious", emoji: "⚡", color: "42 60% 55%", path: "courage" },
  { label: "Confused", emoji: "🌀", color: "280 30% 55%", path: "clarity" },
  { label: "Exploring", emoji: "✨", color: "45 70% 60%", path: "clarity" },
  { label: "Sharing", emoji: "🕊️", color: "152 35% 45%", path: "clarity" },
  { label: "Courage", emoji: "🦁", color: "210 30% 55%", path: "courage" },
  { label: "Compassion", emoji: "🌸", color: "350 40% 60%", path: "compassion" },
  { label: "Clarity", emoji: "💎", color: "42 55% 55%", path: "clarity" },
];

export const intents = [
  { label: "To be heard", emoji: "👂", description: "I just need someone to listen" },
  { label: "To get perspective", emoji: "🔮", description: "Help me see this differently" },
  { label: "To share freely", emoji: "🕊️", description: "I want to express without judgment" },
  { label: "To ask something", emoji: "💭", description: "I have a question on my mind" },
];

export const empathyStarters = [
  "I understand this feeling…",
  "You're not alone…",
  "Something similar helped me…",
  "I hear you, and…",
];

export const reflectionOptions = [
  { label: "Heard", emoji: "💛" },
  { label: "Lighter", emoji: "🌤️" },
  { label: "Still confused", emoji: "🌀" },
  { label: "Neutral", emoji: "🌿" },
];

export const communityTopics = [
  { label: "Emotional Health", emoji: "💚" },
  { label: "Anxiety", emoji: "⚡" },
  { label: "Self-Discovery", emoji: "🔮" },
  { label: "Relationships", emoji: "🤝" },
  { label: "Mindfulness", emoji: "🧘" },
  { label: "Healing", emoji: "🌿" },
  { label: "Sleep", emoji: "🌙" },
  { label: "Gratitude", emoji: "✨" },
];

// Sacred Paths mapping
export type SacredPath = "clarity" | "courage" | "compassion";

export const sacredPaths: { id: SacredPath; label: string; fullLabel: string; hue: string; color: string }[] = [
  { id: "clarity", label: "Clarity", fullLabel: "Path of Clarity", hue: "42 55% 55%", color: "42 60% 72%" },
  { id: "courage", label: "Courage", fullLabel: "Path of Courage", hue: "210 25% 65%", color: "210 30% 75%" },
  { id: "compassion", label: "Compassion", fullLabel: "Path of Compassion", hue: "350 35% 60%", color: "15 45% 70%" },
];

export function getEmotionPath(emotion: string): SacredPath {
  const found = emotions.find((e) => e.label === emotion);
  return found?.path as SacredPath || "clarity";
}

export function getTimeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
