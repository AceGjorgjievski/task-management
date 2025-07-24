import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { AlertService } from '../../shared/services/alert.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskCategories } from '../../shared/constants/task-categories';
import { Priorities } from '../../shared/constants/priorities';
import { Task } from '../../shared/models/task';
import { noSpecialCharsValidator } from '../../shared/validators/custom-validators';
import { FormUtils } from '../../shared/utils/form-utils';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  taskForm!: FormGroup;
  taskId!: number;
  categories = Object.values(TaskCategories);
  priorities = Object.values(Priorities);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = +id;
      this.taskService.getTask(this.taskId).subscribe((task) => {
        if (task) {
          this.buildForm(task);
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

  buildForm(task: Task) {
    this.taskForm = this.fb.group({
      title: [task.title, [Validators.required, noSpecialCharsValidator()]],
      description: [
        task.description,
        [Validators.required, noSpecialCharsValidator()],
      ],
      category: [task.category, Validators.required],
      dueDate: [task.dueDate, Validators.required],
      priority: [task.priority, Validators.required],
      completed: [task.completed],
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const updatedTask: Task = {
      id: this.taskId,
      ...this.taskForm.value,
    };

    this.taskService.updateTask(updatedTask).subscribe((result) => {
      if (result) {
        this.alertService.setSuccessMessage('Task has been updated!');
        this.router.navigate(['/taskList']);
      } else {
        alert('Failed to update task.');
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/taskList']);
  }
  
  getErrors(controlName: string) {
    return FormUtils.getErrors(this.taskForm.get(controlName));
  }

  getIsTouchedOrDirty(controlName: string) {
    return FormUtils.isTouchedOrDirty(this.taskForm.get(controlName));
  }
}
