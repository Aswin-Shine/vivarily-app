export type ViewState = 'home' | 'website' | 'portfolio' | 'podcast' | 'project' | 'terms' | 'contact';

export interface NavItem {
  id: ViewState;
  label: string;
  title: string;
  description: string;
}