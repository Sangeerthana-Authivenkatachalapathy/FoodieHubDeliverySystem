import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [class.auth-layout]="isAuthRoute">
      <!-- Auth Layout -->
      <div *ngIf="isAuthRoute" class="auth-wrapper">
        <router-outlet></router-outlet>
      </div>

      <!-- Main Layout -->
      <div *ngIf="!isAuthRoute" class="main-layout">
        <mat-sidenav-container class="sidenav-container">
          <!-- Sidebar -->
          <mat-sidenav #drawer class="sidenav" fixedInViewport
                      [attr.role]="'navigation'"
                      [mode]="'side'"
                      [opened]="true">
            <mat-toolbar class="sidebar-header">
              <span class="app-title">Restaurant Admin</span>
            </mat-toolbar>
            
            <mat-nav-list>
              <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
                <mat-icon matListItemIcon>dashboard</mat-icon>
                <span matListItemTitle>Dashboard</span>
              </a>
              
              <a mat-list-item routerLink="/restaurants/pending" routerLinkActive="active">
                <mat-icon matListItemIcon>pending</mat-icon>
                <span matListItemTitle>Pending Applications</span>
              </a>
              
              <a mat-list-item routerLink="/restaurants/approved" routerLinkActive="active">
                <mat-icon matListItemIcon>check_circle</mat-icon>
                <span matListItemTitle>Approved Restaurants</span>
              </a>
              
              <a mat-list-item routerLink="/restaurants/rejected" routerLinkActive="active">
                <mat-icon matListItemIcon>cancel</mat-icon>
                <span matListItemTitle>Rejected Applications</span>
              </a>
            </mat-nav-list>
          </mat-sidenav>

          <!-- Main Content -->
          <mat-sidenav-content>
            <!-- Top Toolbar -->
            <mat-toolbar class="top-toolbar">
              <span class="spacer"></span>
              
              <button mat-icon-button [matMenuTriggerFor]="userMenu">
                <mat-icon>account_circle</mat-icon>
              </button>
              
              <mat-menu #userMenu="matMenu">
                <div class="user-info" mat-menu-item disabled>
                  <div class="user-name">{{ (authService.currentUser$ | async)?.name }}</div>
                  <div class="user-email">{{ (authService.currentUser$ | async)?.email }}</div>
                </div>
                <mat-divider></mat-divider>
                <button mat-menu-item (click)="logout()">
                  <mat-icon>logout</mat-icon>
                  <span>Logout</span>
                </button>
              </mat-menu>
            </mat-toolbar>

            <!-- Page Content -->
            <main class="main-content">
              <router-outlet></router-outlet>
            </main>
          </mat-sidenav-content>
        </mat-sidenav-container>
      </div>

      <!-- Global Components -->
      <app-loading-spinner></app-loading-spinner>
      <app-toast></app-toast>
    </div>
  `,
  styles: [`
    .app-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .auth-layout .auth-wrapper {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .main-layout {
      height: 100vh;
    }

    .sidenav-container {
      height: 100%;
    }

    .sidenav {
      width: 250px;
      background: #fff;
      border-right: 1px solid #e0e0e0;
    }

    .sidebar-header {
      background: #3f51b5;
      color: white;
      padding: 0 16px;
    }

    .app-title {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .mat-nav-list .mat-list-item {
      color: #666;
      margin: 4px 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .mat-nav-list .mat-list-item:hover {
      background: #f5f5f5;
      color: #3f51b5;
    }

    .mat-nav-list .mat-list-item.active {
      background: #e8eaf6;
      color: #3f51b5;
    }

    .top-toolbar {
      background: #fff;
      color: #333;
      border-bottom: 1px solid #e0e0e0;
      z-index: 2;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .user-info {
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    .user-name {
      font-weight: 600;
      font-size: 14px;
      color: #333;
    }

    .user-email {
      font-size: 12px;
      color: #666;
      margin-top: 2px;
    }

    .main-content {
      padding: 24px;
      background: #f5f5f5;
      min-height: calc(100vh - 64px);
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 200px;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isAuthRoute = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isAuthRoute = event.url.includes('/login') || event.url.includes('/register');
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}