import { Injectable } from '@angular/core';
import { Task } from '../shared/models/task';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { TaskCategories } from '../shared/constants/task-categories';
import { Priorities } from '../shared/constants/priorities';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  categories = Object.values(TaskCategories);
  prioritiesArray = Object.values(Priorities);
  tasks: Task[] = [];

  createDb() {

    for (let i = 0; i < 5; i++) {
      this.tasks.push({
        id: i + 1,
        title: `Sample Task ${i + 1}`,
        description: `This is a sample description for the task with numeros ${i + 1}.`,
        category: this.categories[i % this.categories.length],
        dueDate: `2025-07-${22 + i}`,
        priority: this.prioritiesArray[i % this.prioritiesArray.length],
        completed: i % 2 === 0 ? true : false,
      });
    }

    return { tasks: this.tasks };
  }

  genId(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  }
}
