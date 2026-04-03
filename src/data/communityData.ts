export const emotions = [
  { label: "Lost", emoji: "🌫️", color: "200 20% 60%" },
  { label: "Overwhelmed", emoji: "🌊", color: "220 40% 55%" },
  { label: "Calm", emoji: "🍃", color: "152 35% 45%" },
  { label: "Anxious", emoji: "⚡", color: "42 60% 55%" },
  { label: "Confused", emoji: "🌀", color: "280 30% 55%" },
  { label: "Exploring", emoji: "✨", color: "45 70% 60%" },
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

export function getTimeAgo(date: Date): string {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
