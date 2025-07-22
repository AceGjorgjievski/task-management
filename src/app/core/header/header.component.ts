import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  pageTitle = 'Welcome';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        if (url.includes('/home')) {
          this.pageTitle = 'Welcome to Home Page!';
        } else if (url.includes('/taskList')) {
          this.pageTitle = 'My Task List';
        } else {
          this.pageTitle = 'Task Manager';
        }
      });
  }
}
