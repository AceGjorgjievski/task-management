import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task';
import { TaskService } from '../../shared/services/task.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  editTask(id: number) {
    this.router.navigate(['/add'], { queryParams: { id } });
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
}
