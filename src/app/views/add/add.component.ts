import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { AlertService } from '../../shared/services/alert.service';
import { TaskCategories } from '../../shared/constants/task-categories';
import { Priorities } from '../../shared/constants/priorities';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit {
  taskForm!: FormGroup;
  categories = Object.values(TaskCategories);
  prioritiesArray = Object.values(Priorities);

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: [this.categories[0], Validators.required],
      dueDate: ['', Validators.required],
      priority: [this.prioritiesArray[0], Validators.required],
      completed: [false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    this.taskService.addTask(this.taskForm.value).subscribe(() => {
      this.alertService.setSuccessMessage('New task has been added!');
      this.router.navigate(['/taskList']);
    });
  }

  onBack(): void {
    this.router.navigate(['/taskList']);
  }
}
