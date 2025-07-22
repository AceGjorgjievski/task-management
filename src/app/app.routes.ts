import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { TaskListComponent } from './views/task-list/task-list.component';
import { AddEditComponent } from './views/add-edit/add-edit.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'add',  component: AddEditComponent},
    { path: 'taskList', component: TaskListComponent },

    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
