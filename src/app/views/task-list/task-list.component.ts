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
    console.log("delete", id);
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
}
