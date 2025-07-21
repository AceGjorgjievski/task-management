export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
}