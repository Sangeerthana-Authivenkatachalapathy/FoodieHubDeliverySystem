import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs/operators';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  currentUser: any;
  currentRoute = '';
  isMobile = false;

  menuItems: MenuItem[] = [
    { title: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { title: 'User Management', icon: 'people', route: '/users' },
    { title: 'Restaurants', icon: 'restaurant', route: '/restaurants' },
    { title: 'Delivery Partners', icon: 'delivery_dining', route: '/delivery-partners' },
    { title: 'Orders', icon: 'shopping_cart', route: '/orders' },
    { title: 'Feedback', icon: 'feedback', route: '/feedback', badge: 3 },
    { title: 'Notifications', icon: 'notifications', route: '/notifications', badge: 5 },
    { title: 'Financial Reports', icon: 'assessment', route: '/reports' }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Check if mobile
    this.checkScreenSize();
  }

  ngOnInit() {
    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Track route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      // Close sidenav on mobile after navigation
      if (this.isMobile && this.sidenav) {
        this.sidenav.close();
      }
    });

    // Check initial route
    this.currentRoute = this.router.url;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  onResize() {
    this.checkScreenSize();
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}