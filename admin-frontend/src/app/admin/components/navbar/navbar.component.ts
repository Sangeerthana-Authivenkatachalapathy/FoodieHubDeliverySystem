import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  currentUser: any;
  notificationCount = 0;

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadNotificationCount();
  }

  loadCurrentUser(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  loadNotificationCount(): void {
    // Load unread notification count
    this.adminService.getNotifications(1, 1).subscribe({
      next: (response) => {
        // Assuming the API returns unread count
        this.notificationCount = response.unreadCount || 0;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onNotificationsClick(): void {
    this.router.navigate(['/admin/notifications']);
  }

  onProfileClick(): void {
    // Navigate to profile or show profile menu
    console.log('Profile clicked');
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        console.error('Logout error:', error);
        // Force logout even if API call fails
        this.router.navigate(['/auth/login']);
      }
    });
  }
}