import { Priorities } from "../constants/priorities";
import { TaskCategories } from "../constants/task-categories";

export interface Task {
  id: number;
  title: string;
  description: string;
  category: TaskCategories;
  dueDate: string;
  priority: Priorities;
  completed: boolean;
}