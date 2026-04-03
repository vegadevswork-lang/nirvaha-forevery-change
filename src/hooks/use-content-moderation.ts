// Client-side content moderation — toxicity detection, crisis keywords, safer phrasing

const TOXIC_PATTERNS = [
  /\b(stupid|idiot|dumb|loser|pathetic|worthless|useless|hate\s+you|shut\s+up|go\s+die)\b/gi,
  /\b(kill\s+(yourself|urself|myself))\b/gi,
  /\b(f+u+c+k+|s+h+i+t+|a+s+s+h+o+l+e+|b+i+t+c+h+)\b/gi,
];

const CRISIS_KEYWORDS = [
  /\b(suicid|kill\s*(myself|me)|end\s*(my|it\s*all)|self[- ]?harm|want\s*to\s*die|don'?t\s*want\s*to\s*live)\b/gi,
];

const JUDGMENTAL_PATTERNS: Array<{ pattern: RegExp; suggestion: string }> = [
  { pattern: /\byou\s+should\b/gi, suggestion: "Consider: \"Something that helped me was…\"" },
  { pattern: /\bjust\s+get\s+over\b/gi, suggestion: "Try: \"I understand this is hard…\"" },
  { pattern: /\bthat'?s\s+not\s+a\s+big\s+deal\b/gi, suggestion: "Try: \"I hear you, and your feelings are valid.\"" },
  { pattern: /\bstop\s+(being|feeling)\b/gi, suggestion: "Try: \"It's okay to feel this way…\"" },
  { pattern: /\bman\s+up\b/gi, suggestion: "Try: \"It takes courage to share this…\"" },
];

export interface ModerationResult {
  isAllowed: boolean;
  isCrisis: boolean;
  toxicityScore: number; // 0-1
  warnings: string[];
  suggestions: string[];
  crisisResources?: string;
}

export function moderateContent(text: string): ModerationResult {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let toxicityScore = 0;
  let isCrisis = false;

  // Crisis detection (highest priority)
  for (const pattern of CRISIS_KEYWORDS) {
    if (pattern.test(text)) {
      isCrisis = true;
      pattern.lastIndex = 0;
    }
  }

  // Toxicity detection
  let toxicMatches = 0;
  for (const pattern of TOXIC_PATTERNS) {
    const matches = text.match(pattern);
    if (matches) {
      toxicMatches += matches.length;
    }
  }
  const wordCount = text.split(/\s+/).length;
  toxicityScore = Math.min(1, toxicMatches / Math.max(wordCount * 0.3, 1));

  if (toxicityScore > 0.3) {
    warnings.push("This message contains language that may feel hurtful to others.");
  }

  // Judgmental tone detection (for responses)
  for (const { pattern, suggestion } of JUDGMENTAL_PATTERNS) {
    if (pattern.test(text)) {
      suggestions.push(suggestion);
      pattern.lastIndex = 0;
    }
  }

  const isAllowed = toxicityScore < 0.5 && !isCrisis;

  return {
    isAllowed,
    isCrisis,
    toxicityScore,
    warnings,
    suggestions,
    crisisResources: isCrisis
      ? "If you're in crisis, please reach out:\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/"
      : undefined,
  };
}

export function getSaferPhrasing(text: string): string | null {
  if (text.length < 5) return null;
  
  // Check for ALL CAPS shouting
  const words = text.split(/\s+/);
  const capsWords = words.filter((w) => w.length > 2 && w === w.toUpperCase());
  if (capsWords.length > words.length * 0.5 && words.length > 3) {
    return "💡 Tip: Lowercase text feels calmer and more welcoming in this space.";
  }
  
  // Check for excessive punctuation
  if (/[!?]{3,}/.test(text)) {
    return "💡 Tip: Softer punctuation helps keep the space calm.";
  }

  return null;
}
