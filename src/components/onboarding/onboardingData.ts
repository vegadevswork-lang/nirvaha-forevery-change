export interface OnboardingOption {
  label: string;
  description: string;
  microcopy: string;
}

export interface OnboardingQuestion {
  question: string;
  subtitle?: string;
  options: OnboardingOption[];
  progressLabel: string;
}

export const questions: OnboardingQuestion[] = [
  {
    question: "What's on your mind?",
    subtitle: "Your answers will help shape the app around your needs.",
    progressLabel: "Understanding you…",
    options: [
      { label: "Elevate mood", description: "Lift your emotional state daily.", microcopy: "" },
      { label: "Reduce stress & anxiety", description: "Tools to manage overwhelm.", microcopy: "" },
      { label: "Improve sleep", description: "Better rest, calmer nights.", microcopy: "" },
      { label: "Increase productivity", description: "Focus and clarity.", microcopy: "" },
      { label: "Something else", description: "We'll figure it out together.", microcopy: "" },
    ],
  },
  {
    question: "When things feel heavy…",
    subtitle: "What do you usually do?",
    progressLabel: "Understanding you…",
    options: [
      { label: "I overthink everything", description: "Your mind keeps searching.", microcopy: "" },
      { label: "I distract myself", description: "Scrolling, busying, avoiding.", microcopy: "" },
      { label: "I keep it inside", description: "You carry more than people know.", microcopy: "" },
      { label: "I talk to someone", description: "Connection helps you process.", microcopy: "" },
      { label: "I don't really know", description: "Sometimes feelings are hard to name.", microcopy: "" },
    ],
  },
  {
    question: "What are you truly seeking?",
    subtitle: "Choose one that calls to you.",
    progressLabel: "Going deeper…",
    options: [
      { label: "Clarity", description: "See life with fresh perspective.", microcopy: "" },
      { label: "Emotional balance", description: "Navigate highs and lows.", microcopy: "" },
      { label: "Inner peace", description: "Cultivate stillness.", microcopy: "" },
      { label: "Control over my thoughts", description: "Quiet the mental noise.", microcopy: "" },
    ],
  },
  {
    question: "How would you like to explore?",
    subtitle: "You can always change this later.",
    progressLabel: "Shaping your journey…",
    options: [
      { label: "AI conversations", description: "A gentle AI guide.", microcopy: "" },
      { label: "Journaling", description: "Writing reveals what words can't.", microcopy: "" },
      { label: "Meditation", description: "Stillness practices.", microcopy: "" },
      { label: "Open to everything", description: "A mix of everything.", microcopy: "" },
    ],
  },
  {
    question: "How much time for yourself?",
    subtitle: "Even a few minutes matter deeply.",
    progressLabel: "Almost there…",
    options: [
      { label: "2–5 min", description: "Quick mindful moments.", microcopy: "" },
      { label: "10 min", description: "A perfect daily practice.", microcopy: "" },
      { label: "15–20 min", description: "Real dedicated space.", microcopy: "" },
      { label: "Go with the flow", description: "No pressure, just flow.", microcopy: "" },
    ],
  },
];
