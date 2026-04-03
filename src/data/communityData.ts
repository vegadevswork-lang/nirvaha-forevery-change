export interface CommunityPost {
  id: string;
  emotion: string;
  intent: string;
  content: string;
  auraColor: string;
  energyState: string;
  timestamp: Date;
  responses: CommunityResponse[];
}

export interface CommunityResponse {
  id: string;
  content: string;
  auraColor: string;
  isVerified: boolean;
  verifiedName?: string;
  verifiedRole?: string;
  timestamp: Date;
}

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

const energyStates = ["Reflective", "Seeking clarity", "Grounding", "Processing", "Opening up", "Healing"];

function randomEnergy() {
  return energyStates[Math.floor(Math.random() * energyStates.length)];
}

export const samplePosts: CommunityPost[] = [
  {
    id: "p1",
    emotion: "Lost",
    intent: "To be heard",
    content: "I've been feeling disconnected from everything lately. Like I'm going through the motions but nothing feels real. I don't know who to talk to about this.",
    auraColor: "200 20% 60%",
    energyState: "Seeking clarity",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    responses: [
      {
        id: "r1",
        content: "I understand this feeling deeply. There was a time when everything felt like static. What helped me was just sitting with it — not fixing, just noticing. You're already doing something brave by sharing.",
        auraColor: "152 35% 45%",
        isVerified: true,
        verifiedName: "Dr. Meera",
        verifiedRole: "Wellness Guide",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      {
        id: "r2",
        content: "You're not alone in this. I felt the same way last month. Sometimes just naming it — 'I feel disconnected' — starts to bring things back. Sending you warmth.",
        auraColor: "42 60% 55%",
        isVerified: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
      },
    ],
  },
  {
    id: "p2",
    emotion: "Anxious",
    intent: "To get perspective",
    content: "Every morning I wake up with this tightness in my chest. I keep worrying about things that haven't happened. How do others deal with this constant anticipation?",
    auraColor: "42 60% 55%",
    energyState: "Processing",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    responses: [
      {
        id: "r3",
        content: "Something similar helped me — I started a '5-minute morning ground.' Before I look at my phone, I place my feet on the floor and just breathe. It doesn't fix everything, but it gives me a softer start.",
        auraColor: "152 35% 45%",
        isVerified: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
      },
    ],
  },
  {
    id: "p3",
    emotion: "Calm",
    intent: "To share freely",
    content: "Today I watched the sunset and cried — not from sadness, but from a strange sense of peace. It felt like the first time I've truly been present in months. I wanted to share this moment.",
    auraColor: "152 35% 45%",
    energyState: "Reflective",
    timestamp: new Date(Date.now() - 1000 * 60 * 200),
    responses: [
      {
        id: "r4",
        content: "This is beautiful. Those moments of unexpected presence are gifts. Thank you for sharing it — reading this made me pause and breathe a little deeper.",
        auraColor: "280 30% 55%",
        isVerified: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
      },
      {
        id: "r5",
        content: "In many contemplative traditions, tears of peace are considered a sign of the heart opening. What you experienced is profound. Hold onto that feeling.",
        auraColor: "45 70% 60%",
        isVerified: true,
        verifiedName: "Ananda",
        verifiedRole: "Spiritual Mentor",
        timestamp: new Date(Date.now() - 1000 * 60 * 170),
      },
    ],
  },
  {
    id: "p4",
    emotion: "Overwhelmed",
    intent: "To be heard",
    content: "I'm juggling work, family, and my own healing all at once. Some days I feel like I'm failing at everything. I just needed to say this out loud.",
    auraColor: "220 40% 55%",
    energyState: "Grounding",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    responses: [
      {
        id: "r6",
        content: "I hear you. The fact that you're trying to hold all of this shows incredible strength — even when it doesn't feel like it. You're not failing. You're human.",
        auraColor: "152 35% 45%",
        isVerified: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 280),
      },
    ],
  },
  {
    id: "p5",
    emotion: "Exploring",
    intent: "To ask something",
    content: "Has anyone tried sound therapy for sleep? I've been curious about singing bowls and binaural beats but don't know where to start.",
    auraColor: "45 70% 60%",
    energyState: "Opening up",
    timestamp: new Date(Date.now() - 1000 * 60 * 400),
    responses: [
      {
        id: "r7",
        content: "I started with Tibetan singing bowls about a year ago. The low frequencies are incredibly grounding. Start with shorter sessions — even 10 minutes before bed can shift your sleep quality.",
        auraColor: "200 20% 60%",
        isVerified: true,
        verifiedName: "Ravi K.",
        verifiedRole: "Sound Healer",
        timestamp: new Date(Date.now() - 1000 * 60 * 380),
      },
    ],
  },
  {
    id: "p6",
    emotion: "Confused",
    intent: "To get perspective",
    content: "I keep being told to 'let go' but no one explains how. How do you actually release something that's been part of you for so long?",
    auraColor: "280 30% 55%",
    energyState: "Seeking clarity",
    timestamp: new Date(Date.now() - 1000 * 60 * 500),
    responses: [],
  },
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
