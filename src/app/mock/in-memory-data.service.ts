import { Injectable } from '@angular/core';
import { Task } from '../shared/models/task';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Buy groceries',
        description: 'Milk, eggs, bread',
        category: 'Personal',
        dueDate: '2025-07-22',
        priority: 'Medium',
        completed: false
      },
      {
        id: 2,
        title: 'Prepare meeting slides',
        description: 'For team update',
        category: 'Work',
        dueDate: '2025-07-23',
        priority: 'High',
        completed: false
      }
    ];
    return { tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  }
}
