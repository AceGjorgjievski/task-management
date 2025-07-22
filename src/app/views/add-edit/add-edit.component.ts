import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task';

@Component({
  selector: 'app-add-edit',
  imports: [],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})
export class AddEditComponent implements OnInit{
  taskId!: number | null;
  taskToEdit: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const idParam = params.get('id');
      this.taskId = idParam ? +idParam : null;

      if (this.taskId) {
        this.taskService.getTask(this.taskId).subscribe((task) => {
          this.taskToEdit = task;
        })
      }
    });
  }
}
