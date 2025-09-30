export type TypeButton = 'submit' | 'reset' | 'button';
export interface Task {
  id: number;
  text: string;
  description?: string | null;
}
