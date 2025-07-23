import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'api/tasks';
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {}

  getTask(id: number): Observable<Task | undefined> {
    if(this.tasks.length > 0) {
      const task = this.tasks.find(task => task.id === id);
      return of(task);
    }

    return new Observable((observer) => {
      this.getTasks().subscribe((tasks) => {
        const foundTask = tasks.find((task) => task.id === id);
        return of(foundTask);
      })
    })
  }

  getTasks(): Observable<Task[]> {
    if(this.tasks.length > 0) {
      return of(this.tasks);
    }

    return new Observable((observer) => {
      this.http.get<Task[]>(this.apiUrl).subscribe((tasks) => {
        this.tasks = tasks;
        observer.next(tasks);
        observer.complete();
      })
    })
  }

  addTask(task: Task): Observable<Task> {
    return new Observable((observer) => {
    this.getTasks().subscribe(() => {
      const newId = this.tasks.length > 0
        ? Math.max(...this.tasks.map(t => t.id)) + 1
        : 1;

      const newTask = { ...task, id: newId, };
      this.tasks.push(newTask);
      observer.next(newTask);
      observer.complete();
    });
  });
  }

  updateTask(task: Task): Observable<Task | null> {
    return new Observable((observer) => {
      this.getTask(task.id).subscribe((foundTask) => {
        if(foundTask) {
          foundTask.title = task.title;
          foundTask.description = task.description;
          foundTask.category = task.category;
          foundTask.dueDate = task.dueDate;
          foundTask.priority = task.priority;
          foundTask.completed = task.completed;
          observer.next(foundTask);
        } else {
          observer.next(null);
        }
        observer.complete();
      })
    })
  }

  deleteTask(id: number): Observable<unknown> {
    return new Observable((observer) => {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          this.tasks = this.tasks.filter((task) => task.id !==id);
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      })
    })
  }
}

