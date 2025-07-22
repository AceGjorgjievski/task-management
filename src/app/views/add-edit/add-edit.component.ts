import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task';
import { TASK_CATEGORIES } from '../../shared/constants/task-categories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css',
})
export class AddEditComponent implements OnInit {
  taskId!: number | null;
  taskToEdit: Task = {
    id: 0,
    title: '',
    description: '',
    category: '',
    dueDate: '',
    priority: 'Low',
    completed: false,
  };
  categories = TASK_CATEGORIES;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTask(+id).subscribe((task) => {
        if (task) {
          this.taskToEdit = task;
        } else {
          this.router.navigate(['/not-found']);
        }
      });
    }
  }
}
