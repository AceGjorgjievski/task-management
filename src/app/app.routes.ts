import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TaskListComponent } from './views/task-list/task-list.component';
import { TaskDetailsComponent } from './views/task-details/task-details.component';
import { AddComponent } from './views/add/add.component';
import { EditComponent } from './views/edit/edit.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'add',  component: AddComponent},
    { path: ':id/edit',  component: EditComponent},
    { path: 'taskList', component: TaskListComponent },
    { path: ':id/details', component: TaskDetailsComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
