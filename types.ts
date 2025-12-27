
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
