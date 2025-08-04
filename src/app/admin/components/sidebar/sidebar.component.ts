import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class AdminSidebarComponent {
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Orders', icon: 'shopping_cart', route: '/admin/orders' },
    { label: 'Restaurants', icon: 'restaurant', route: '/admin/restaurants' },
    { label: 'Delivery Partners', icon: 'delivery_dining', route: '/admin/delivery-partners' },
    { label: 'Feedback', icon: 'feedback', route: '/admin/feedback' },
    { label: 'Notifications', icon: 'notifications', route: '/admin/notifications' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}