import { Injectable } from '@angular/core';
import { Task } from '../shared/models/task';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TASK_CATEGORIES } from '../shared/constants/task-categories';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  categories = TASK_CATEGORIES;
  createDb() {
    const tasks: Task[] = [];

    for (let i = 0; i < 5; i++) {
      tasks.push({
        id: i + 1,
        title: `Sample Task ${i + 1}`,
        description: `This is a description for task ${i + 1}.`,
        category: this.categories[i % this.categories.length],
        dueDate: `2025-07-${22 + i}`,
        priority: ['Low', 'Medium', 'High'][i % 3] as 'Low' | 'Medium' | 'High',
        completed: false,
      });
    }

    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }
}
