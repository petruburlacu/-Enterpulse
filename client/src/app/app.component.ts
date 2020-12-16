import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from './shared/models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'client';
  navMenu: MenuItem[] = [];
  isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getNavMenu();
  }

  getNavMenu(): void {
    this.navMenu = [
      {title: 'Report', action: () => this.router.navigate(['/report'])},
      {title: 'Authentication', action: () => this.router.navigate(['/login'])},
      {title: 'GitHub', action: () => null, icon: 'github'}
    ];
  }
}
