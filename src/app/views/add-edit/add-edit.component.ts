import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task';
import { TaskCategories } from '../../shared/constants/task-categories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Priorities } from '../../shared/constants/priorities';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
})
export class AddEditComponent implements OnInit {
  taskId!: number | null;
  task: Task = {
    id: 0,
    title: '',
    description: '',
    category: TaskCategories.Work,
    dueDate: '',
    priority: Priorities.Low,
    completed: false,
  };

  categories = Object.values(TaskCategories);
  prioritiesArray = Object.values(Priorities);
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskService.getTask(+id).subscribe((task) => {
        if (task) {
          this.task = task;
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  onSubmit() {
    if (
      this.task.title.trim().length === 0  ||
      this.task.description.trim().length === 0  ||
      !this.task.category ||
      !this.task.dueDate ||
      !this.task.priority ||
      !this.task.dueDate
    ) {
      alert('Please fill out the forms');
      return;
    }

    if (this.isEditMode) {
      const id = this.route.snapshot.paramMap.get('id');
      this.taskService.updateTask(this.task);
    } else {
      this.taskService.addTask(this.task).subscribe((task) => {
        this.alertService.setSuccessMessage("New task has been added!");
      });
    }
    this.router.navigate(['/taskList']);
  }

  onBack(): void {
    this.router.navigate(['/taskList']);
  }
}
