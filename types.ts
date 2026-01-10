
export type ToneType = 
  | 'REFUSAL' 
  | 'NUDGE' 
  | 'REQUEST' 
  | 'APOLOGY' 
  | 'GENERAL' 
  | 'THANKS' 
  | 'PROPOSAL' 
  | 'INQUIRY' 
  | 'FEEDBACK' 
  | 'NOTICE'
  | 'FOLLOW_UP'
  | 'DELAY'
  | 'APPROVAL'
  | 'SHARING'
  | 'VISIT'
  | 'CLARIFY'
  | 'GREETING'
  | 'COMEDY'
  // Fun Mode Flavors
  | 'LEGENDARY_MANAGER'
  | 'MZ_CRAZY'
  | 'K_DRAMA'
  | 'EXTREME_APOLOGY'
  | 'OBSESSIVE'
  | 'OVER_THE_TOP'
  | 'IRON_WALL'
  | 'SUPERSTAR';

export interface ToneParameters {
  politeness: number; // 0-100
  friendliness: number; // 0-100
  assertiveness: number; // 0-100
}

export interface ToneOption {
  id: ToneType;
  label: string;
  icon: string;
  description: string;
}

export interface EmailTemplate {
  id: string;
  label: string;
  icon: string;
  content: string;
}

export interface EmailResult {
  subject: string;
  alternativeSubjects: string[];
  body: string;
  tips: string[];
}

export interface AppState {
  input: string;
  selectedTone: ToneType;
  toneParams: ToneParameters;
  result: EmailResult | null;
  isLoading: boolean;
  error: string | null;
  isFunMode: boolean;
}
