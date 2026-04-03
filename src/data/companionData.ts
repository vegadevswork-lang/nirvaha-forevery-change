export interface Mentor {
  id: string;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviewCount: number;
  nextAvailable: string;
  verified: boolean;
  certified: boolean;
  sessionsCompleted: number;
  specializations: string[];
  targetAudience: string[];
  approach: string;
  expectation: string;
  bio: string;
  introVideoUrl?: string;
  reviews: { author: string; text: string; rating: number }[];
  sessionOptions: { duration: string; price: number }[];
  formats: string[];
  availability: string;
  responseTime: string;
  avatarGradient: string;
  domain: "career" | "relationship" | "purpose" | "emotional";
}

export interface SpiritualGuide {
  id: string;
  name: string;
  spiritualTitle: string;
  tradition: string;
  lineage: string;
  institution?: string;
  lineageVerified: boolean;
  communityEndorsed: boolean;
  offerings: string[];
  sessionStyle: string;
  bio: string;
  donationRange: { min: number; max: number };
  formats: string[];
  avatarGradient: string;
}

export const mentorDomains = [
  { id: "career", label: "Career Guidance", icon: "Briefcase", description: "Navigate transitions, find clarity in professional life" },
  { id: "relationship", label: "Relationship Clarity", icon: "Heart", description: "Understand patterns, build healthier connections" },
  { id: "purpose", label: "Life Purpose", icon: "Compass", description: "Discover meaning, align with your deeper calling" },
  { id: "emotional", label: "Emotional Regulation", icon: "Brain", description: "Build resilience, master your inner landscape" },
];

export const mentors: Mentor[] = [
  {
    id: "m1",
    name: "Priya Sharma",
    title: "Career Transition Coach",
    location: "Mumbai, India",
    rating: 4.9,
    reviewCount: 127,
    nextAvailable: "Tomorrow 6pm",
    verified: true,
    certified: true,
    sessionsCompleted: 342,
    specializations: ["Career transitions", "Purpose discovery", "Age 28-45"],
    targetAudience: ["Professionals feeling stuck", "Career changers", "Those seeking alignment"],
    approach: "I blend narrative therapy with practical action planning. We'll explore the stories you tell yourself about success, then build a bridge to where you actually want to be.",
    expectation: "Sessions are conversational, not prescriptive. You'll leave with clarity and 2-3 actionable steps. I'll check in between sessions to keep momentum.",
    bio: "I left corporate law at 35 because I felt empty despite success. That painful pivot taught me more about purpose than any degree. Now I help others navigate that same crossroads — with less suffering and more clarity.",
    reviews: [
      { author: "Arun K.", text: "Priya helped me see that my restlessness wasn't a problem — it was a compass. I changed careers 6 months ago and haven't looked back.", rating: 5 },
      { author: "Sneha M.", text: "I came in confused about everything. After 4 sessions, I had a plan I actually believed in. Priya doesn't tell you what to do — she helps you hear yourself.", rating: 5 },
      { author: "Rahul D.", text: "The best investment I've made in myself. Priya creates a space where honesty feels safe.", rating: 5 },
    ],
    sessionOptions: [
      { duration: "30 min", price: 499 },
      { duration: "60 min", price: 999 },
    ],
    formats: ["Text", "Voice", "Video"],
    availability: "Mon-Fri, 5pm-9pm IST",
    responseTime: "Usually within 4 hours",
    avatarGradient: "linear-gradient(135deg, hsl(152 35% 28%), hsl(145 40% 55%))",
    domain: "career",
  },
  {
    id: "m2",
    name: "Arjun Menon",
    title: "Relationship Clarity Guide",
    location: "Bangalore, India",
    rating: 4.8,
    reviewCount: 89,
    nextAvailable: "Today 8pm",
    verified: true,
    certified: true,
    sessionsCompleted: 256,
    specializations: ["Attachment patterns", "Communication", "Self-worth in relationships"],
    targetAudience: ["People in relationship transitions", "Those healing from heartbreak", "Couples seeking clarity"],
    approach: "I use attachment theory and somatic awareness to help you understand your relationship patterns at a body level, not just intellectually.",
    expectation: "Expect gentle but honest conversations. We'll look at patterns you might not want to see, but always with compassion. Bring a journal.",
    bio: "After my own divorce, I spent 3 years studying why we love the way we do. I trained in attachment-focused therapy and now help others understand their relationship blueprints.",
    reviews: [
      { author: "Meera S.", text: "Arjun helped me understand why I kept choosing emotionally unavailable partners. That awareness changed everything.", rating: 5 },
      { author: "Vikram P.", text: "I was skeptical about talking to someone about my relationship. Arjun made it feel like talking to a wise friend, not a clinical session.", rating: 4 },
    ],
    sessionOptions: [
      { duration: "30 min", price: 499 },
      { duration: "60 min", price: 999 },
    ],
    formats: ["Voice", "Video"],
    availability: "Mon-Sat, 6pm-10pm IST",
    responseTime: "Usually within 2 hours",
    avatarGradient: "linear-gradient(135deg, hsl(42 60% 72%), hsl(42 45% 58%))",
    domain: "relationship",
  },
  {
    id: "m3",
    name: "Dr. Kavitha Rajan",
    title: "Purpose & Meaning Coach",
    location: "Chennai, India",
    rating: 4.9,
    reviewCount: 203,
    nextAvailable: "Wednesday 4pm",
    verified: true,
    certified: true,
    sessionsCompleted: 512,
    specializations: ["Existential clarity", "Midlife transitions", "Values alignment"],
    targetAudience: ["Those questioning life direction", "Post-achievement emptiness", "Age 35-55"],
    approach: "Drawing from existential psychology and Indian philosophy, I help you find meaning not by adding more to your life, but by uncovering what's already there.",
    expectation: "Deep, reflective sessions. We'll sit with discomfort when needed. You'll gain frameworks for making decisions aligned with your authentic self.",
    bio: "I'm a psychologist who realized that most suffering comes not from trauma, but from living someone else's life. I blend Western existential therapy with Vedantic self-inquiry to help people find their own truth.",
    reviews: [
      { author: "Sanjay B.", text: "Dr. Kavitha helped me realize that my 'success' was built on someone else's definition. Finding my own purpose was terrifying and liberating.", rating: 5 },
      { author: "Ananya R.", text: "These sessions are unlike any coaching I've experienced. Kavitha goes deeper — to the roots of why you exist, not just what you should do.", rating: 5 },
      { author: "Deepak M.", text: "I came seeking career advice and left with life clarity. The best kind of scope creep.", rating: 5 },
    ],
    sessionOptions: [
      { duration: "30 min", price: 599 },
      { duration: "60 min", price: 1199 },
    ],
    formats: ["Text", "Voice", "Video"],
    availability: "Tue-Sat, 3pm-8pm IST",
    responseTime: "Usually within 6 hours",
    avatarGradient: "linear-gradient(135deg, hsl(280 30% 45%), hsl(260 25% 60%))",
    domain: "purpose",
  },
  {
    id: "m4",
    name: "Rohan Desai",
    title: "Emotional Resilience Coach",
    location: "Pune, India",
    rating: 4.7,
    reviewCount: 64,
    nextAvailable: "Tomorrow 10am",
    verified: true,
    certified: true,
    sessionsCompleted: 178,
    specializations: ["Anxiety management", "Emotional regulation", "Stress resilience"],
    targetAudience: ["High-achievers with burnout", "Those with emotional overwhelm", "Age 22-40"],
    approach: "I combine CBT techniques with mindfulness and breathwork. We work on both the mind and the body — because emotions live in both.",
    expectation: "Practical sessions with tangible tools you can use immediately. I'll teach you techniques, we'll practice together, and you'll build your own emotional toolkit.",
    bio: "I burned out at 28 as a startup founder. That breakdown became my breakthrough into understanding emotional intelligence. Now I teach others to build resilience before they hit the wall.",
    reviews: [
      { author: "Nikhil G.", text: "Rohan gave me tools that actually work in real-time. When anxiety hits, I now have a toolkit instead of panic.", rating: 5 },
      { author: "Pooja T.", text: "Practical, no-nonsense, but deeply compassionate. Rohan gets it because he's been there.", rating: 4 },
    ],
    sessionOptions: [
      { duration: "30 min", price: 449 },
      { duration: "60 min", price: 899 },
    ],
    formats: ["Text", "Voice", "Video"],
    availability: "Mon-Fri, 8am-12pm IST",
    responseTime: "Usually within 3 hours",
    avatarGradient: "linear-gradient(135deg, hsl(200 40% 40%), hsl(190 35% 55%))",
    domain: "emotional",
  },
];

export const spiritualGuides: SpiritualGuide[] = [
  {
    id: "sg1",
    name: "Swami Anandananda",
    spiritualTitle: "Swami",
    tradition: "Vedanta",
    lineage: "Ramakrishna Order",
    institution: "Ramakrishna Mission, Belur Math",
    lineageVerified: true,
    communityEndorsed: true,
    offerings: ["Meditation instruction", "Contemplative inquiry", "Scriptural study", "Existential companionship"],
    sessionStyle: "Sessions are unhurried and begin with a few minutes of silence. We move at the pace of truth, not the clock. Expect questions that invite you inward, not answers that keep you dependent.",
    bio: "I've lived as a monk for 22 years. My journey began with a question I couldn't answer: 'Who am I without my achievements?' That question still guides my teaching. I don't offer solutions — I offer presence, and sometimes, the right question at the right time.",
    donationRange: { min: 500, max: 1500 },
    formats: ["Video"],
    avatarGradient: "linear-gradient(135deg, hsl(30 50% 55%), hsl(25 45% 65%))",
  },
  {
    id: "sg2",
    name: "Acharya Devika",
    spiritualTitle: "Acharya",
    tradition: "Yoga & Tantra",
    lineage: "Kashmir Shaivism",
    lineageVerified: true,
    communityEndorsed: true,
    offerings: ["Meditation instruction", "Ritual guidance", "Energy practices", "Spiritual counselling"],
    sessionStyle: "I weave together guided meditation, mantra, and contemplative dialogue. Sessions are experiential — we don't just talk about the sacred, we practice touching it together.",
    bio: "For 15 years I've walked the path of Kashmir Shaivism, studying with masters in India and Nepal. My teaching is rooted in the body as a gateway to the divine. I believe spirituality should be felt, not just understood.",
    donationRange: { min: 500, max: 1200 },
    formats: ["Video", "Voice"],
    avatarGradient: "linear-gradient(135deg, hsl(320 30% 45%), hsl(340 25% 55%))",
  },
  {
    id: "sg3",
    name: "Bhante Sumedho",
    spiritualTitle: "Bhante",
    tradition: "Theravada Buddhism",
    lineage: "Thai Forest Tradition",
    institution: "Wat Pah Nanachat Lineage",
    lineageVerified: true,
    communityEndorsed: true,
    offerings: ["Vipassana meditation", "Contemplative inquiry", "Existential companionship", "Mindfulness guidance"],
    sessionStyle: "Simple, direct, grounded in silence. We sit. We observe. We discuss what arises. No elaborate rituals — just the practice of being present with what is.",
    bio: "I ordained as a Buddhist monk 18 years ago after a career in medicine. The suffering I witnessed in hospitals led me to seek the root of suffering itself. I now share what the Buddha taught: a practical path to inner freedom.",
    donationRange: { min: 0, max: 1000 },
    formats: ["Video"],
    avatarGradient: "linear-gradient(135deg, hsl(42 50% 55%), hsl(38 45% 65%))",
  },
];

export const contributorDomains = [
  {
    category: "Mental Health & Therapy",
    roles: [
      "Licensed Clinical Psychologist",
      "Cognitive Behavioral Therapist (CBT)",
      "Dialectical Behavior Therapist (DBT)",
      "Art / Music / Dance Therapist",
      "Trauma-Informed Counselor",
      "Grief & Loss Specialist",
    ],
  },
  {
    category: "Life & Wellness Coaching",
    roles: [
      "Certified Life Coach (ICF)",
      "Wellness & Lifestyle Coach",
      "Mindfulness-Based Stress Reduction (MBSR) Instructor",
      "Breathwork Facilitator",
      "Somatic Experiencing Practitioner",
      "Holistic Nutritionist & Wellness Guide",
    ],
  },
  {
    category: "Career & Professional Growth",
    roles: [
      "Executive Coach",
      "Career Transition Specialist",
      "Leadership Development Coach",
      "Entrepreneurship Mentor",
      "Organizational Psychologist",
      "Financial Wellness Advisor",
    ],
  },
  {
    category: "Relationships & Family",
    roles: [
      "Couples Therapist (EFT / Gottman trained)",
      "Family Systems Therapist",
      "Pre-marital Counselor",
      "Divorce & Co-parenting Mediator",
      "Attachment Theory Specialist",
      "Intimacy & Communication Coach",
    ],
  },
  {
    category: "Spiritual & Contemplative",
    roles: [
      "Vedanta / Advaita Teacher",
      "Buddhist Meditation Teacher (Vipassana, Zen)",
      "Sufi Guide / Murshid",
      "Yoga Philosophy Instructor",
      "Interfaith Spiritual Director",
      "Shamanic / Indigenous Healing Practitioner",
      "Kirtan / Bhajan / Chanting Guide",
      "Ritual & Ceremony Facilitator",
    ],
  },
  {
    category: "Youth & Student Support",
    roles: [
      "School Counselor / Adolescent Mentor",
      "College Transition Coach",
      "Study Skills & Academic Coach",
      "Youth Empowerment Facilitator",
      "Anti-Bullying & Social Skills Trainer",
    ],
  },
  {
    category: "Community & Social Impact",
    roles: [
      "Peer Support Specialist",
      "Community Health Worker",
      "Diversity, Equity & Inclusion Coach",
      "Social Worker (LCSW)",
      "Crisis Intervention Specialist",
      "Restorative Justice Facilitator",
    ],
  },
];
