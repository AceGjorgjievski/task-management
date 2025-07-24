import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task';
import { TaskCategories } from '../../shared/constants/task-categories';
import { Priorities } from '../../shared/constants/priorities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-details',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit{

  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.taskService.getTask(+id).subscribe((t) => {
        this.task = t;
      })
      console.log(id);
    }
  }

}
