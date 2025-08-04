import { Component, OnInit } from '@angular/core';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'System' | 'Order' | 'Restaurant' | 'Delivery' | 'Customer';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Read' | 'Dismissed';
  timestamp: Date;
  recipient?: string;
}

@Component({
  selector: 'app-admin-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class AdminNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedType: string = 'all';
  selectedPriority: string = 'all';
  selectedStatus: string = 'all';
  loading = true;

  typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'System', label: 'System' },
    { value: 'Order', label: 'Order' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Customer', label: 'Customer' }
  ];

  priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Critical', label: 'Critical' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Read', label: 'Read' },
    { value: 'Dismissed', label: 'Dismissed' }
  ];

  ngOnInit(): void {
    this.loadNotifications();
  }

  private loadNotifications(): void {
    setTimeout(() => {
      this.notifications = [
        {
          id: 'NOT001',
          title: 'System Maintenance',
          message: 'Scheduled maintenance will begin at 2:00 AM EST',
          type: 'System',
          priority: 'High',
          status: 'New',
          timestamp: new Date('2024-01-15T10:30:00')
        },
        {
          id: 'NOT002',
          title: 'Order #1234 Issue',
          message: 'Customer reported issue with order delivery',
          type: 'Order',
          priority: 'Medium',
          status: 'Read',
          timestamp: new Date('2024-01-15T11:15:00'),
          recipient: 'Order Team'
        },
        {
          id: 'NOT003',
          title: 'New Restaurant Registration',
          message: 'Pizza Corner has requested to join the platform',
          type: 'Restaurant',
          priority: 'Low',
          status: 'New',
          timestamp: new Date('2024-01-15T12:00:00')
        },
        {
          id: 'NOT004',
          title: 'Critical System Error',
          message: 'Payment gateway experiencing issues',
          type: 'System',
          priority: 'Critical',
          status: 'New',
          timestamp: new Date('2024-01-15T13:45:00')
        }
      ];
      this.filteredNotifications = [...this.notifications];
      this.loading = false;
    }, 1000);
  }

  onTypeChange(): void {
    this.filterNotifications();
  }

  onPriorityChange(): void {
    this.filterNotifications();
  }

  onStatusChange(): void {
    this.filterNotifications();
  }

  private filterNotifications(): void {
    this.filteredNotifications = this.notifications.filter(notification => {
      const matchesType = this.selectedType === 'all' || notification.type === this.selectedType;
      const matchesPriority = this.selectedPriority === 'all' || notification.priority === this.selectedPriority;
      const matchesStatus = this.selectedStatus === 'all' || notification.status === this.selectedStatus;
      
      return matchesType && matchesPriority && matchesStatus;
    });
  }

  updateNotificationStatus(notificationId: string, newStatus: Notification['status']): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.status = newStatus;
      this.filterNotifications();
    }
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      if (notification.status === 'New') {
        notification.status = 'Read';
      }
    });
    this.filterNotifications();
  }

  dismissAll(): void {
    this.notifications.forEach(notification => {
      if (notification.status !== 'Dismissed') {
        notification.status = 'Dismissed';
      }
    });
    this.filterNotifications();
  }
}