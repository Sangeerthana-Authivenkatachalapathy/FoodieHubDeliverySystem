import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class AdminNavbarComponent {
  userProfile = {
    name: 'Admin User',
    role: 'Administrator'
  };

  onLogout(): void {
    // Implement logout logic
    console.log('Logout clicked');
  }

  onProfile(): void {
    // Implement profile logic
    console.log('Profile clicked');
  }
}