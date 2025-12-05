// src/components/types.ts
export interface Task {
  id: number;
  title: string;
  completed?: boolean;
  status?: 'todo' | 'in-progress' | 'done';
  priority?: 'low' | 'medium' | 'high'; // <-- Agora opcional
  description?: string;
  dueDate?: string;
  project?: string;
  overdue?: boolean;
  completedAt?: string;
}

export interface HistoryItem extends Task {
  completedAt: string; // Obrigatório em HistoryItem
}