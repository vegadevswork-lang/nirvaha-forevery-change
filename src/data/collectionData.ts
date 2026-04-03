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
}

export interface ContentRow {
  title: string;
  items: ContentItem[];
}

export const heroContent: ContentItem = {
  id: "hero-1",
  title: "Inner Worlds, Outer Worlds",
  subtitle: "A journey through the universal vibration connecting all things — consciousness, meditation, and the nature of reality.",
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  type: "film",
  duration: "2h 4m",
  tags: ["Spiritual Science", "Consciousness"],
  rating: 4.8,
};

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
      },
      {
        id: "e2",
        title: "Jay Shetty: Think Like a Monk",
        image: "https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?w=400&q=80",
        type: "talk",
        duration: "55 min",
        tags: ["Purpose", "Monk Wisdom"],
        rating: 4.7,
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
