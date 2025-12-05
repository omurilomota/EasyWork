  // src/types.ts
  export interface Task {
    id: number;
    title: string;
    completed?: boolean;
    status?: 'todo' | 'in-progress' | 'done';
    priority?: 'low' | 'medium' | 'high';
    description?: string;
    dueDate?: string;
    project?: string;
    projectId?: number; // <-- Adicione esta linha
    overdue?: boolean;
    completedAt?: string;
  }

  export interface HistoryItem extends Task {
    completedAt: string; // Obrigatório em HistoryItem
  }