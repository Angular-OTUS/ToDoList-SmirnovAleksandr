export type TypeButton = 'submit' | 'reset' | 'button';
export type TypeStatus = 'InProgress' | 'Completed';
export type TypeStatusFilter = 'All' | 'InProgress' | 'Completed';
export interface Task {
  id: number;
  text: string;
  description?: string | null;
  status?: TypeStatus;
}
