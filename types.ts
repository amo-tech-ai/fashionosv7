
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

export interface BrandMetric {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface IntelligenceInsight {
  type: 'action' | 'warning' | 'info';
  title: string;
  description: string;
}

// CRM Specific Types
export type ContactCategory = 'Designer' | 'Buyer' | 'Press' | 'Sponsor';
export type ContactStatus = 'Active' | 'Lead' | 'Archive';

export interface Socials {
  instagram?: string;
  linkedin?: string;
  twitter?: string;
}

export interface InteractionLog {
  id: string;
  type: 'Note' | 'Call' | 'Meeting' | 'Email' | 'RSVP' | 'Placement';
  title: string;
  description: string;
  date: string;
}

export interface Deal {
  id: string;
  title: string;
  value: string;
  stage: 'Prospect' | 'Negotiation' | 'Contracting' | 'Closed';
  projectedClose: string;
  linkedCollection?: string;
}

export interface RSVPEntry {
  eventId: string;
  eventName: string;
  status: 'Invited' | 'Confirmed' | 'Attended' | 'Declined';
}

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
