import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterModule, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [
    NgbCollapseModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  pageTitle = 'Task Manager';
  isCollapsed = true;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setTitle(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setTitle(event.urlAfterRedirects);
      });
  }

  private setTitle(url: string) {
    if (url.includes('/home')) {
      this.pageTitle = 'Welcome to Home Page!';
    } else if (url.includes('/taskList')) {
      this.pageTitle = 'My Task List';
    } else if (url.includes('/add')) {
      this.pageTitle = "Add New Task";
    } else {
      this.pageTitle = 'Task Manager';
    }
  }
}
