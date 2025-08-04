import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuGroup {
  name: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  
  currentRoute = '';
  
  menuGroups: MenuGroup[] = [
    {
      name: 'Overview',
      items: [
        {
          name: 'Dashboard',
          icon: 'dashboard',
          route: '/admin/dashboard'
        }
      ]
    },
    {
      name: 'Management',
      items: [
        {
          name: 'Orders',
          icon: 'receipt_long',
          route: '/admin/orders'
        },
        {
          name: 'Restaurants',
          icon: 'restaurant',
          route: '/admin/restaurants'
        },
        {
          name: 'Delivery Partners',
          icon: 'delivery_dining',
          route: '/admin/delivery-partners'
        }
      ]
    },
    {
      name: 'Communication',
      items: [
        {
          name: 'Feedback',
          icon: 'feedback',
          route: '/admin/feedback'
        },
        {
          name: 'Notifications',
          icon: 'notifications',
          route: '/admin/notifications'
        }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Track current route for active menu highlighting
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.currentRoute.startsWith(route);
  }
}