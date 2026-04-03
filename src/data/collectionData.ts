export interface ContentItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  duration?: string;
  type: "series" | "film" | "meditation" | "podcast" | "talk" | "playlist" | "soundscape";
  tags: string[];
  rating?: number;
  isNew?: boolean;
  isTrending?: boolean;
  episodes?: Episode[];
  reviews?: Review[];
  hasSubtitles?: boolean;
  hasTranscript?: boolean;
  progress?: number; // 0-100 percent watched
}

export interface Episode {
  id: string;
  title: string;
  duration: string;
  description: string;
  isPlaying?: boolean;
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ContentRow {
  title: string;
  items: ContentItem[];
}

export const heroSlides: ContentItem[] = [
  {
    id: "hero-1",
    title: "Inner Worlds, Outer Worlds",
    subtitle: "A journey through the universal vibration connecting all things — consciousness, meditation, and the nature of reality.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    type: "film",
    duration: "2h 4m",
    tags: ["Spiritual Science", "Consciousness"],
    rating: 4.8,
    hasSubtitles: true,
    hasTranscript: true,
    episodes: [],
    reviews: [
      { id: "r1", user: "Arjun M.", avatar: "https://i.pravatar.cc/40?img=11", rating: 5, comment: "Life-changing perspective on consciousness.", date: "2 days ago" },
      { id: "r2", user: "Maya S.", avatar: "https://i.pravatar.cc/40?img=5", rating: 5, comment: "Beautiful cinematography and profound insights.", date: "1 week ago" },
    ],
  },
  {
    id: "hero-2",
    title: "Headspace: Unwind Your Mind",
    subtitle: "Interactive and immersive meditation experiences for every mood — relax, focus, or drift off to sleep.",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80",
    type: "series",
    duration: "3 Seasons",
    tags: ["Meditation", "Sleep", "Focus"],
    rating: 4.9,
    isNew: true,
    hasSubtitles: true,
    episodes: [
      { id: "he1", title: "How to Let Go", duration: "12 min", description: "Release tension and find ease." },
      { id: "he2", title: "Dealing With Anger", duration: "14 min", description: "Transform reactive energy into calm awareness." },
      { id: "he3", title: "Falling Asleep", duration: "20 min", description: "Guided wind-down for restful sleep." },
    ],
    reviews: [
      { id: "r3", user: "Priya K.", avatar: "https://i.pravatar.cc/40?img=9", rating: 5, comment: "Best meditation series out there!", date: "3 days ago" },
    ],
  },
  {
    id: "hero-3",
    title: "The Wisdom of Trauma",
    subtitle: "Dr. Gabor Maté explores the connection between illness, addiction, and unresolved trauma in modern society.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    type: "film",
    duration: "1h 27m",
    tags: ["Trauma", "Healing", "Documentary"],
    rating: 4.9,
    isTrending: true,
    hasSubtitles: true,
    hasTranscript: true,
    reviews: [
      { id: "r4", user: "David L.", avatar: "https://i.pravatar.cc/40?img=12", rating: 5, comment: "Essential viewing for understanding human suffering.", date: "5 days ago" },
    ],
  },
  {
    id: "hero-4",
    title: "Sounds of the Earth",
    subtitle: "An immersive soundscape journey through rainforests, oceans, and ancient mountains. Pure healing frequencies.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    type: "soundscape",
    duration: "2h 30m",
    tags: ["Sound Therapy", "Nature", "Healing"],
    rating: 4.7,
    hasSubtitles: false,
    reviews: [
      { id: "r5", user: "Luna W.", avatar: "https://i.pravatar.cc/40?img=20", rating: 4, comment: "Perfect for deep work and sleep.", date: "1 day ago" },
    ],
  },
  {
    id: "hero-5",
    title: "Monk Life: 30 Days of Stillness",
    subtitle: "Follow three strangers as they live in a monastery, discovering silence, discipline, and inner transformation.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    type: "series",
    duration: "6 Episodes",
    tags: ["Spirituality", "Lifestyle", "Documentary"],
    rating: 4.8,
    isNew: true,
    hasSubtitles: true,
    hasTranscript: true,
    episodes: [
      { id: "ml1", title: "Arrival", duration: "42 min", description: "Three strangers arrive at a remote monastery." },
      { id: "ml2", title: "Silence", duration: "38 min", description: "The challenge of three days without speaking." },
      { id: "ml3", title: "The Teacher", duration: "45 min", description: "Meeting the head monk and learning the path." },
      { id: "ml4", title: "Breaking Point", duration: "40 min", description: "Confronting inner demons during meditation." },
      { id: "ml5", title: "Surrender", duration: "44 min", description: "The moment everything shifts." },
      { id: "ml6", title: "Return", duration: "48 min", description: "Going back to the world, forever changed." },
    ],
    reviews: [
      { id: "r6", user: "Kai R.", avatar: "https://i.pravatar.cc/40?img=15", rating: 5, comment: "Raw, real, and deeply moving.", date: "2 days ago" },
      { id: "r7", user: "Sophie T.", avatar: "https://i.pravatar.cc/40?img=23", rating: 5, comment: "Made me want to visit a monastery myself!", date: "4 days ago" },
    ],
  },
];

export const continueWatching: ContentItem[] = [
  {
    id: "cw1",
    title: "Headspace Guide to Meditation",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80",
    type: "series",
    duration: "Ep 3 · 12 min",
    tags: ["Meditation", "Beginner"],
    rating: 4.7,
    progress: 65,
  },
  {
    id: "cw2",
    title: "The Wisdom of Trauma",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
    type: "film",
    duration: "43 min left",
    tags: ["Trauma", "Healing"],
    rating: 4.9,
    progress: 48,
  },
  {
    id: "cw3",
    title: "432 Hz Healing Frequencies",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
    type: "soundscape",
    duration: "22 min left",
    tags: ["Frequency", "Healing"],
    rating: 4.8,
    progress: 75,
  },
  {
    id: "cw4",
    title: "Eckhart Tolle: Present Moment",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80",
    type: "talk",
    duration: "28 min left",
    tags: ["Presence", "Awareness"],
    rating: 4.8,
    progress: 60,
  },
];

export const aiRecommendations: ContentItem[] = [
  {
    id: "ai1",
    title: "Yoga Nidra for Deep Rest",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
    type: "meditation",
    duration: "35 min",
    tags: ["Yoga Nidra", "Sleep"],
    rating: 4.9,
    subtitle: "Based on your evening listening habits",
  },
  {
    id: "ai2",
    title: "Finding Purpose with Ikigai",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
    type: "talk",
    duration: "48 min",
    tags: ["Purpose", "Japanese Wisdom"],
    rating: 4.7,
    subtitle: "Because you enjoyed Inner Engineering",
  },
  {
    id: "ai3",
    title: "Ocean Meditation at Dawn",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
    type: "soundscape",
    duration: "1h",
    tags: ["Ocean", "Morning"],
    rating: 4.8,
    subtitle: "Matches your calm mood today",
  },
  {
    id: "ai4",
    title: "Thich Nhat Hanh: The Art of Living",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80",
    type: "talk",
    duration: "1h 15m",
    tags: ["Mindfulness", "Buddhism"],
    rating: 4.9,
    isNew: true,
    subtitle: "Trending with users like you",
  },
];

export const contentRows: ContentRow[] = [
  {
    title: "Trending Now",
    items: [
      {
        id: "t1",
        title: "Headspace Guide to Meditation",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&q=80",
        type: "series",
        duration: "8 Episodes",
        tags: ["Meditation", "Beginner"],
        rating: 4.7,
        isTrending: true,
        hasSubtitles: true,
        episodes: [
          { id: "t1e1", title: "How Meditation Works", duration: "10 min", description: "Understand the science behind meditation." },
          { id: "t1e2", title: "Letting Go of Stress", duration: "12 min", description: "A simple technique to release daily tension." },
          { id: "t1e3", title: "Dealing With Distractions", duration: "11 min", description: "Train your wandering mind." },
        ],
        reviews: [
          { id: "tr1", user: "Anita D.", avatar: "https://i.pravatar.cc/40?img=1", rating: 5, comment: "Perfect for beginners!", date: "1 week ago" },
        ],
      },
      {
        id: "t2",
        title: "The Mindfulness Movement",
        image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&q=80",
        type: "film",
        duration: "1h 36m",
        tags: ["Mindfulness", "Documentary"],
        rating: 4.5,
        isTrending: true,
        hasSubtitles: true,
        hasTranscript: true,
      },
      {
        id: "t3",
        title: "Healing Sounds of Nature",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80",
        type: "soundscape",
        duration: "45 min",
        tags: ["Sound Therapy", "Nature"],
        rating: 4.9,
      },
      {
        id: "t4",
        title: "Sadhguru: Inner Engineering",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
        type: "talk",
        duration: "1h 22m",
        tags: ["Spiritual Science", "Yoga"],
        rating: 4.8,
        isTrending: true,
        hasSubtitles: true,
      },
      {
        id: "t5",
        title: "Calm Sleep Stories",
        image: "https://images.unsplash.com/photo-1472552944129-b035e9ea3744?w=400&q=80",
        type: "playlist",
        duration: "10 Stories",
        tags: ["Sleep", "Relaxation"],
        rating: 4.6,
      },
    ],
  },
  {
    title: "Guided Meditations",
    items: [
      {
        id: "m1",
        title: "Morning Clarity Meditation",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
        type: "meditation",
        duration: "15 min",
        tags: ["Morning", "Focus"],
        rating: 4.8,
        isNew: true,
      },
      {
        id: "m2",
        title: "Body Scan for Deep Rest",
        image: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&q=80",
        type: "meditation",
        duration: "25 min",
        tags: ["Sleep", "Body Scan"],
        rating: 4.7,
      },
      {
        id: "m3",
        title: "Loving-Kindness Practice",
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80",
        type: "meditation",
        duration: "20 min",
        tags: ["Compassion", "Heart"],
        rating: 4.9,
      },
      {
        id: "m4",
        title: "Breath Awareness Journey",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
        type: "meditation",
        duration: "10 min",
        tags: ["Breathing", "Beginner"],
        rating: 4.6,
      },
      {
        id: "m5",
        title: "Chakra Balancing Flow",
        image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=400&q=80",
        type: "meditation",
        duration: "30 min",
        tags: ["Chakra", "Energy"],
        rating: 4.8,
      },
    ],
  },
  {
    title: "Expert Talks & Lectures",
    items: [
      {
        id: "e1",
        title: "Brené Brown: The Power of Vulnerability",
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80",
        type: "talk",
        duration: "20 min",
        tags: ["Vulnerability", "Courage"],
        rating: 4.9,
        hasSubtitles: true,
        hasTranscript: true,
      },
      {
        id: "e2",
        title: "Jay Shetty: Think Like a Monk",
        image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=400&q=80",
        type: "talk",
        duration: "55 min",
        tags: ["Purpose", "Monk Wisdom"],
        rating: 4.7,
        hasSubtitles: true,
      },
      {
        id: "e3",
        title: "Eckhart Tolle: Present Moment",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=400&q=80",
        type: "talk",
        duration: "1h 10m",
        tags: ["Presence", "Awareness"],
        rating: 4.8,
      },
      {
        id: "e4",
        title: "Dr. Joe Dispenza: Rewire Your Brain",
        image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80",
        type: "talk",
        duration: "1h 30m",
        tags: ["Neuroscience", "Transformation"],
        rating: 4.7,
        isNew: true,
        hasSubtitles: true,
        hasTranscript: true,
      },
    ],
  },
  {
    title: "Wellness Mini-Series",
    items: [
      {
        id: "s1",
        title: "The Goop Lab",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80",
        type: "series",
        duration: "6 Episodes",
        tags: ["Wellness", "Exploration"],
        rating: 4.3,
        episodes: [
          { id: "s1e1", title: "The Healing Trip", duration: "30 min", description: "Exploring psychedelic therapy." },
          { id: "s1e2", title: "Cold Comfort", duration: "28 min", description: "Wim Hof method and cold exposure." },
        ],
      },
      {
        id: "s2",
        title: "Limitless with Chris Hemsworth",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
        type: "series",
        duration: "6 Episodes",
        tags: ["Longevity", "Health"],
        rating: 4.6,
        isNew: true,
        episodes: [
          { id: "s2e1", title: "Stress Proof", duration: "45 min", description: "Building resilience to stress." },
          { id: "s2e2", title: "Shock", duration: "42 min", description: "Testing the body's limits." },
        ],
      },
      {
        id: "s3",
        title: "Unwell: A Wellness Journey",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80",
        type: "series",
        duration: "6 Episodes",
        tags: ["Alternative", "Wellness"],
        rating: 4.2,
      },
      {
        id: "s4",
        title: "Live to 100: Secrets of Blue Zones",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
        type: "series",
        duration: "4 Episodes",
        tags: ["Longevity", "Lifestyle"],
        rating: 4.8,
        isTrending: true,
        episodes: [
          { id: "s4e1", title: "Okinawa", duration: "50 min", description: "The secret diet of the world's longest-living people." },
          { id: "s4e2", title: "Sardinia", duration: "48 min", description: "Mountain villages where men live to 100." },
          { id: "s4e3", title: "Loma Linda", duration: "46 min", description: "A community of faith and longevity." },
          { id: "s4e4", title: "Ikaria", duration: "52 min", description: "The island where people forget to die." },
        ],
      },
    ],
  },
  {
    title: "Sound Therapy & Playlists",
    items: [
      {
        id: "p1",
        title: "Tibetan Singing Bowls",
        image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=400&q=80",
        type: "soundscape",
        duration: "1h",
        tags: ["Sound Healing", "Tibetan"],
        rating: 4.9,
      },
      {
        id: "p2",
        title: "Rain & Thunder Ambience",
        image: "https://images.unsplash.com/photo-1501691223387-dd0500403074?w=400&q=80",
        type: "soundscape",
        duration: "2h",
        tags: ["Nature", "Sleep"],
        rating: 4.7,
      },
      {
        id: "p3",
        title: "432 Hz Healing Frequencies",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
        type: "soundscape",
        duration: "1h 30m",
        tags: ["Frequency", "Healing"],
        rating: 4.8,
      },
      {
        id: "p4",
        title: "Ocean Waves for Focus",
        image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
        type: "soundscape",
        duration: "45 min",
        tags: ["Ocean", "Focus"],
        rating: 4.6,
      },
      {
        id: "p5",
        title: "Forest Birdsong Morning",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
        type: "soundscape",
        duration: "1h",
        tags: ["Forest", "Morning"],
        rating: 4.7,
        isNew: true,
      },
    ],
  },
  {
    title: "Daily Reflection",
    items: [
      {
        id: "d1",
        title: "Gratitude in 5 Minutes",
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
        type: "meditation",
        duration: "5 min",
        tags: ["Gratitude", "Daily"],
        rating: 4.8,
      },
      {
        id: "d2",
        title: "Evening Wind-Down Ritual",
        image: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=400&q=80",
        type: "meditation",
        duration: "12 min",
        tags: ["Evening", "Ritual"],
        rating: 4.6,
      },
      {
        id: "d3",
        title: "Midday Reset",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&q=80",
        type: "meditation",
        duration: "8 min",
        tags: ["Reset", "Afternoon"],
        rating: 4.5,
      },
      {
        id: "d4",
        title: "Sunday Soul Check-In",
        image: "https://images.unsplash.com/photo-1465056836900-8f1e940f2114?w=400&q=80",
        type: "podcast",
        duration: "25 min",
        tags: ["Reflection", "Weekly"],
        rating: 4.7,
        isNew: true,
      },
    ],
  },
];

export const categories = [
  "All",
  "Meditation",
  "Series",
  "Talks",
  "Sound Therapy",
  "Podcasts",
  "Films",
];

// Helper: get all content items flat
export const getAllContent = (): ContentItem[] => {
  const all: ContentItem[] = [...heroSlides, ...continueWatching, ...aiRecommendations];
  contentRows.forEach((r) => all.push(...r.items));
  return all;
};

// Helper: find related content
export const getRelatedContent = (item: ContentItem): ContentItem[] => {
  const all = getAllContent();
  return all
    .filter((c) => c.id !== item.id && (c.type === item.type || c.tags.some((t) => item.tags.includes(t))))
    .slice(0, 6);
};
