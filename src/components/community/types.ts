export interface CommunityPost {
  id: string;
  emotion: string;
  intent: string;
  content: string;
  auraColor: string;
  energyState: string;
  timestamp: Date;
  responses: CommunityResponse[];
  isOwn?: boolean;
  edited?: boolean;
  topicSpace: string;
  resonances: number;
  resonatedByUser?: boolean;
}

export interface CommunityResponse {
  id: string;
  content: string;
  auraColor: string;
  isVerified: boolean;
  verifiedName?: string;
  verifiedRole?: string;
  timestamp: Date;
  isOwn?: boolean;
  edited?: boolean;
  parentId?: string;
  replies?: CommunityResponse[];
  resonances: number;
  resonatedByUser?: boolean;
}

export type SortMode = "new" | "resonated" | "seeking";
