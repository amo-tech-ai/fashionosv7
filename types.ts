
export type NavigationItem = 
  | 'Dashboard'
  | 'CRM'
  | 'Analysis'
  | 'Profile'
  | 'Calendar'
  | 'Shoots'
  | 'Events'
  | 'Campaigns'
  | 'Media'
  | 'Concierge'
  | 'Settings';

export interface BrandDNA {
  colorPalette: string[];
  lightingStyle: string;
  compositionRules: string[];
  motifs: string[];
  luxuryTier: 'Ultra-Luxury' | 'Luxury' | 'Contemporary' | 'Premium' | 'High-Street';
}

export interface ChannelNode {
  type: 'Amazon' | 'Shopify' | 'Instagram' | 'TikTok' | 'Pinterest' | 'Official';
  url: string;
  verified: boolean;
  confidence: number;
}

export interface NPIScore {
  total: number;
  breakdown: {
    clarity: number;
    reach: number;
    readiness: number;
    consistency: number;
  };
  summary: string;
}

export interface BrandProfile {
  id: string;
  name: string;
  description: string;
  website: string;
  dna: BrandDNA;
  channels: ChannelNode[];
  npi: NPIScore;
  personas: string[];
  pillars: string[];
}

// Shoot System Types
export type ShootStatus = 'Draft' | 'Planned' | 'In Progress' | 'Post-Production' | 'Completed';

export interface ShotItem {
  id: string;
  description: string;
  lighting: string;
  framing: string;
  dnaAlignment: number; // 0-100
  status: 'Pending' | 'Captured' | 'Rejected';
}

export interface Shoot {
  id: string;
  title: string;
  date: string;
  location: string;
  status: ShootStatus;
  concept: string;
  shotList: ShotItem[];
  dnaSnapshot: BrandDNA; // Locked DNA at time of shoot creation
}

// CRM & Global Types
export type ContactCategory = 'Designer' | 'Buyer' | 'Press' | 'Sponsor';
export type ContactStatus = 'Active' | 'Lead' | 'Archive';

export interface Socials { instagram?: string; linkedin?: string; twitter?: string; }
export interface InteractionLog { id: string; type: string; title: string; description: string; date: string; }
export interface Deal { id: string; title: string; value: string; stage: string; projectedClose: string; }
export interface RSVPEntry { eventId: string; eventName: string; status: string; }
export interface Contact {
  id: string;
  name: string;
  role: string;
  company: string;
  category: ContactCategory;
  status: ContactStatus;
  lastContact: string;
  city?: string;
  socials: Socials;
  deals: Deal[];
  interactionHistory: InteractionLog[];
  rsvpHistory: RSVPEntry[];
  placements?: number;
}
