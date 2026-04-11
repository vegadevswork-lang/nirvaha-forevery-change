export interface OnboardingOption {
  label: string;
  icon: string;
  illustration?: string;
  description: string;
  microcopy: string;
}

export interface OnboardingQuestion {
  question: string;
  subtitle?: string;
  options: OnboardingOption[];
  progressLabel: string;
  layout: "grid" | "list" | "pills";
}

export const questions: OnboardingQuestion[] = [
  {
    question: "What brings you to Nirvaha?",
    subtitle: "Choose what resonates most",
    layout: "grid",
    progressLabel: "Understanding you…",
    options: [
      {
        label: "Finding calm",
        icon: "🍃",
        illustration: "leaf",
        description: "Learn to let go of mental busy-ness and gently drift into a restful stillness.",
        microcopy: "Peace is a beautiful place to begin.",
      },
      {
        label: "Feeling less stressed",
        icon: "🌊",
        illustration: "waves",
        description: "Discover tools to manage overwhelm and build emotional resilience day by day.",
        microcopy: "You're not alone in this.",
      },
      {
        label: "Understanding myself",
        icon: "🪞",
        illustration: "mirror",
        description: "Explore your inner world through guided reflection and self-discovery.",
        microcopy: "Curiosity is the first step inward.",
      },
      {
        label: "Finding purpose",
        icon: "🧭",
        illustration: "compass",
        description: "Gain clarity on what matters most and align your life with your deeper values.",
        microcopy: "Purpose reveals itself gently.",
      },
      {
        label: "Managing anxiety",
        icon: "🫧",
        illustration: "bubbles",
        description: "Build practical skills to calm anxious thoughts and feel more grounded.",
        microcopy: "Let's explore this together.",
      },
      {
        label: "Just checking it out",
        icon: "✨",
        illustration: "sparkles",
        description: "No pressure — explore everything Nirvaha offers at your own pace.",
        microcopy: "Beautiful — we'll show you everything.",
      },
    ],
  },
  {
    question: "When things feel heavy…",
    subtitle: "What do you usually do?",
    layout: "list",
    progressLabel: "Understanding you…",
    options: [
      {
        label: "I overthink everything",
        icon: "🌀",
        illustration: "spiral",
        description: "Your mind is always searching for answers.",
        microcopy: "Your mind is searching for answers.",
      },
      {
        label: "I distract myself",
        icon: "📱",
        illustration: "phone",
        description: "Scrolling, busying, anything to avoid the feeling.",
        microcopy: "That's a common way to cope.",
      },
      {
        label: "I keep it inside",
        icon: "🤐",
        illustration: "sealed",
        description: "You carry more than people know.",
        microcopy: "Holding it in takes strength too.",
      },
      {
        label: "I talk to someone",
        icon: "💬",
        illustration: "chat",
        description: "Connection helps you process and heal.",
        microcopy: "Connection is healing.",
      },
      {
        label: "I don't really know",
        icon: "🌫️",
        illustration: "mist",
        description: "Sometimes feelings are hard to name.",
        microcopy: "Let's explore this further.",
      },
    ],
  },
  {
    question: "What are you truly seeking?",
    subtitle: "Choose one that calls to you",
    layout: "grid",
    progressLabel: "Going deeper…",
    options: [
      {
        label: "Clarity",
        icon: "💎",
        illustration: "diamond",
        description: "See your life and choices with fresh perspective.",
        microcopy: "Clarity begins with asking.",
      },
      {
        label: "Emotional balance",
        icon: "⚖️",
        illustration: "balance",
        description: "Navigate highs and lows with more steadiness.",
        microcopy: "Balance is a practice, not a destination.",
      },
      {
        label: "Inner peace",
        icon: "🕊️",
        illustration: "dove",
        description: "Cultivate stillness even amidst life's noise.",
        microcopy: "You deserve stillness.",
      },
      {
        label: "Control over my thoughts",
        icon: "🧠",
        illustration: "brain",
        description: "Quiet the mental noise and find focus.",
        microcopy: "This is a good place to begin.",
      },
    ],
  },
  {
    question: "How would you like to explore?",
    subtitle: "You can always change this later",
    layout: "grid",
    progressLabel: "Shaping your journey…",
    options: [
      {
        label: "AI conversations",
        icon: "🤖",
        illustration: "ai",
        description: "A gentle AI guide who learns what matters to you.",
        microcopy: "We'll guide you with care.",
      },
      {
        label: "Journaling",
        icon: "📝",
        illustration: "journal",
        description: "Writing reveals what words can't say out loud.",
        microcopy: "Writing reveals what words can't say.",
      },
      {
        label: "Meditation",
        icon: "🧘",
        illustration: "meditate",
        description: "Stillness practices to calm and center you.",
        microcopy: "Stillness is where healing lives.",
      },
      {
        label: "Open to everything",
        icon: "🌈",
        illustration: "rainbow",
        description: "We'll curate a mix of everything for you.",
        microcopy: "Beautiful — we'll show you everything.",
      },
    ],
  },
  {
    question: "How much time for yourself?",
    subtitle: "Even a few minutes matter deeply",
    layout: "pills",
    progressLabel: "Almost there…",
    options: [
      {
        label: "2–5 min",
        icon: "⏱️",
        illustration: "timer",
        description: "Quick mindful moments throughout your day.",
        microcopy: "Even a few minutes matter deeply.",
      },
      {
        label: "10 min",
        icon: "🕐",
        illustration: "clock",
        description: "A perfect amount of daily presence.",
        microcopy: "A perfect amount of presence.",
      },
      {
        label: "15–20 min",
        icon: "🕑",
        illustration: "clock",
        description: "Real, dedicated space for inner work.",
        microcopy: "You're making real space for yourself.",
      },
      {
        label: "Go with the flow",
        icon: "🌿",
        illustration: "plant",
        description: "No pressure, just follow what feels right.",
        microcopy: "We love that — no pressure, just flow.",
      },
    ],
  },
];
