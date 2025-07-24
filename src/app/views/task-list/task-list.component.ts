import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  showAlert = false;
  successMessage: string | null = null;

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.successMessage = this.alertService.getSuccessMessage();
    if (this.successMessage) {
      setTimeout(() => this.successMessage = null, 2000);
    }
    this.getTasks();
  }

  editTask(id: number) {
    this.router.navigate([`/${id}/edit`]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
    });
  }

  private getTasks() {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  toggleCompleted(task: Task) {
    let foundTask = this.tasks.find((t) => t.id === task.id);
    foundTask!.completed = !foundTask!.completed;
    this.taskService.updateTask(foundTask!).subscribe();
  }

  sortTasks(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.tasks.sort((a: any, b: any) => {
      let aVal = undefined;
      let bVal = undefined;
      if(column === 'priority') {
        const priorityMap = {
          Low: 1,
          Medium: 2,
          High: 3
        };
          aVal = priorityMap[a.priority as keyof typeof priorityMap];
          bVal = priorityMap[b.priority as keyof typeof priorityMap];
      } else {
        aVal = a[column];
        bVal = b[column];
      }
      
      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  goToDetails(id: number) {
    this.router.navigate([`/${id}/details`]);
  }
}
