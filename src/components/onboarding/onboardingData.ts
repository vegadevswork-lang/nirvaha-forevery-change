export interface OnboardingQuestion {
  question: string;
  options: string[];
  progressLabel: string;
  microcopy: string[];
}

export const questions: OnboardingQuestion[] = [
  {
    question: "Right now… what feels closest to your heart?",
    options: [
      "I feel a bit lost",
      "I'm overwhelmed",
      "I'm okay, but something feels missing",
      "I just want peace",
      "I'm curious about myself",
    ],
    progressLabel: "Understanding you…",
    microcopy: [
      "That makes sense…",
      "You're not alone in this.",
      "Many feel this way — it's okay.",
      "Peace is a beautiful place to begin.",
      "Curiosity is the first step inward.",
    ],
  },
  {
    question: "When things feel heavy… what do you usually do?",
    options: [
      "I overthink everything",
      "I distract myself",
      "I keep it inside",
      "I talk to someone",
      "I don't know what I feel",
    ],
    progressLabel: "Understanding you…",
    microcopy: [
      "Your mind is searching for answers.",
      "That's a common way to cope.",
      "Holding it in takes strength too.",
      "Connection is healing.",
      "Let's explore this further.",
    ],
  },
  {
    question: "What are you truly seeking right now?",
    options: [
      "Clarity",
      "Emotional balance",
      "Inner peace",
      "Purpose",
      "Control over my thoughts",
    ],
    progressLabel: "Going deeper…",
    microcopy: [
      "Clarity begins with asking.",
      "Balance is a practice, not a destination.",
      "You deserve stillness.",
      "Purpose reveals itself gently.",
      "This is a good place to begin.",
    ],
  },
  {
    question: "How would you like to explore your inner world?",
    options: [
      "Conversations (AI guide)",
      "Journaling & reflection",
      "Meditation & calm practices",
      "Stories & insights",
      "Open to everything",
    ],
    progressLabel: "Shaping your journey…",
    microcopy: [
      "We'll guide you with care.",
      "Writing reveals what words can't say.",
      "Stillness is where healing lives.",
      "Stories connect us to ourselves.",
      "Beautiful — we'll show you everything.",
    ],
  },
  {
    question: "How much time can you give yourself each day?",
    options: [
      "2–5 minutes",
      "10 minutes",
      "15–20 minutes",
      "Go with the flow",
    ],
    progressLabel: "Shaping your journey…",
    microcopy: [
      "Even a few minutes matter deeply.",
      "A perfect amount of presence.",
      "You're making real space for yourself.",
      "We love that — no pressure, just flow.",
    ],
  },
];
