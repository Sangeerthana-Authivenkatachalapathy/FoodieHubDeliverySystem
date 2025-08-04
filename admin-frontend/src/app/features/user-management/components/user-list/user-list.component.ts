import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { User, UserFilters, UserStatus, UserRole } from '@shared/models/user.model';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'profileImage',
    'name',
    'email',
    'phoneNumber',
    'userRole',
    'status',
    'createdAt',
    'lastLoginAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<User>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 1;
  isLoading = false;

  // Filter properties
  filters: UserFilters = {};
  userRoles = Object.values(UserRole);
  userStatuses = Object.values(UserStatus);
  searchTerm = '';

  constructor(
    private userService: UserManagementService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Load users with current filters and pagination
   */
  loadUsers(): void {
    this.isLoading = true;
    
    this.userService.getAllUsers(this.currentPage, this.pageSize, this.filters)
      .subscribe({
        next: (response) => {
          this.dataSource.data = response.users;
          this.totalCount = response.totalCount;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.isLoading = false;
        }
      });
  }

  /**
   * Handle page change
   */
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  /**
   * Apply search filter
   */
  applySearchFilter(): void {
    this.filters.searchTerm = this.searchTerm;
    this.currentPage = 1;
    this.loadUsers();
  }

  /**
   * Apply role filter
   */
  onRoleFilterChange(role: UserRole | null): void {
    this.filters.role = role || undefined;
    this.currentPage = 1;
    this.loadUsers();
  }

  /**
   * Apply status filter
   */
  onStatusFilterChange(status: UserStatus | null): void {
    this.filters.status = status || undefined;
    this.currentPage = 1;
    this.loadUsers();
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.filters = {};
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadUsers();
  }

  /**
   * View user details
   */
  viewUser(user: User): void {
    // Navigate to user detail component or open dialog
    console.log('View user:', user);
  }

  /**
   * Edit user
   */
  editUser(user: User): void {
    // Navigate to user edit component or open dialog
    console.log('Edit user:', user);
  }

  /**
   * Update user status
   */
  updateUserStatus(user: User, newStatus: UserStatus): void {
    // Open confirmation dialog
    const dialogRef = this.dialog.open(UserStatusDialogComponent, {
      width: '400px',
      data: { user, newStatus }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUserStatus(user.id, newStatus, result.reason)
          .subscribe({
            next: () => {
              this.loadUsers(); // Refresh the list
            },
            error: (error) => {
              console.error('Error updating user status:', error);
            }
          });
      }
    });
  }

  /**
   * Delete user
   */
  deleteUser(user: User): void {
    // Open confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete user "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id)
          .subscribe({
            next: () => {
              this.loadUsers(); // Refresh the list
            },
            error: (error) => {
              console.error('Error deleting user:', error);
            }
          });
      }
    });
  }

  /**
   * Export users data
   */
  exportUsers(): void {
    this.userService.exportUsers(this.filters)
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `users_export_${new Date().toISOString().split('T')[0]}.xlsx`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          console.error('Error exporting users:', error);
        }
      });
  }

  /**
   * Get status badge class
   */
  getStatusClass(status: UserStatus): string {
    switch (status) {
      case UserStatus.ACTIVE:
        return 'status-active';
      case UserStatus.INACTIVE:
        return 'status-inactive';
      case UserStatus.SUSPENDED:
        return 'status-suspended';
      case UserStatus.PENDING_APPROVAL:
        return 'status-pending';
      case UserStatus.REJECTED:
        return 'status-rejected';
      default:
        return 'status-unknown';
    }
  }

  /**
   * Get role display name
   */
  getRoleDisplayName(role: UserRole): string {
    switch (role) {
      case UserRole.ADMIN:
        return 'Admin';
      case UserRole.CUSTOMER:
        return 'Customer';
      case UserRole.RESTAURANT_OWNER:
        return 'Restaurant Owner';
      case UserRole.DELIVERY_PARTNER:
        return 'Delivery Partner';
      default:
        return role;
    }
  }
}

// Import dialog components (these would be created separately)
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { UserStatusDialogComponent } from '../user-status-dialog/user-status-dialog.component';