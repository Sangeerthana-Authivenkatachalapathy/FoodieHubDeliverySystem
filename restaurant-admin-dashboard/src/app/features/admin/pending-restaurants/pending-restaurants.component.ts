import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

import { AdminService } from '../../../core/services/admin.service';
import { Restaurant } from '../../../core/models/restaurant.model';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastNotificationComponent } from '../../../shared/components/toast-notification/toast-notification.component';

@Component({
  selector: 'app-pending-restaurants',
  templateUrl: './pending-restaurants.component.html',
  styleUrls: ['./pending-restaurants.component.css']
})
export class PendingRestaurantsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'select',
    'image',
    'name',
    'location',
    'cuisine',
    'submittedAt',
    'actions'
  ];

  dataSource = new MatTableDataSource<Restaurant>();
  selection = new SelectionModel<Restaurant>(true, []);
  loading = false;
  searchQuery = '';
  
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPendingRestaurants();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
    // Custom filter predicate
    this.dataSource.filterPredicate = (data: Restaurant, filter: string) => {
      const searchText = filter.toLowerCase();
      return data.name.toLowerCase().includes(searchText) ||
             data.email.toLowerCase().includes(searchText) ||
             data.address.city.toLowerCase().includes(searchText) ||
             data.cuisine.some(c => c.toLowerCase().includes(searchText));
    };
  }

  private loadPendingRestaurants(): void {
    this.loading = true;
    
    const params = {
      page: this.currentPage + 1,
      limit: this.pageSize,
      search: this.searchQuery,
      sortBy: this.sort?.active || 'submittedAt',
      sortOrder: this.sort?.direction || 'desc'
    };

    this.adminService.getPendingRestaurants(params).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.dataSource.data = response.data;
          this.totalCount = response.pagination?.total || 0;
        }
      },
      error: (error) => {
        this.loading = false;
        this.showToast('Failed to load pending restaurants', 'error');
        console.error('Error loading pending restaurants:', error);
      }
    });
  }

  onSearch(): void {
    this.dataSource.filter = this.searchQuery;
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.loadPendingRestaurants();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.onSearch();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPendingRestaurants();
  }

  onSortChange(): void {
    this.currentPage = 0;
    this.loadPendingRestaurants();
  }

  // Selection methods
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // Action methods
  viewDetails(restaurant: Restaurant): void {
    this.router.navigate(['/admin/restaurant-details', restaurant.id]);
  }

  approveRestaurant(restaurant: Restaurant): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Approve Restaurant',
      message: `Are you sure you want to approve "${restaurant.name}"? This action cannot be undone.`,
      confirmText: 'Approve',
      cancelText: 'Cancel',
      type: 'success'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.adminService.approveRestaurant(restaurant.id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast('Restaurant approved successfully', 'success');
              this.loadPendingRestaurants();
            } else {
              this.showToast(response.message || 'Failed to approve restaurant', 'error');
            }
          },
          error: (error) => {
            this.loading = false;
            this.showToast('Failed to approve restaurant', 'error');
            console.error('Error approving restaurant:', error);
          }
        });
      }
    });
  }

  rejectRestaurant(restaurant: Restaurant): void {
    const dialogData: ConfirmationDialogData = {
      title: 'Reject Restaurant',
      message: `Are you sure you want to reject "${restaurant.name}"? Please provide a reason for rejection.`,
      confirmText: 'Reject',
      cancelText: 'Cancel',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // In a real implementation, you would show a dialog to get rejection reason
        const reason = 'Documents incomplete'; // This should come from a dialog
        
        this.loading = true;
        this.adminService.rejectRestaurant(restaurant.id, reason).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast('Restaurant rejected successfully', 'success');
              this.loadPendingRestaurants();
            } else {
              this.showToast(response.message || 'Failed to reject restaurant', 'error');
            }
          },
          error: (error) => {
            this.loading = false;
            this.showToast('Failed to reject restaurant', 'error');
            console.error('Error rejecting restaurant:', error);
          }
        });
      }
    });
  }

  // Bulk actions
  bulkApprove(): void {
    if (this.selection.selected.length === 0) {
      this.showToast('Please select restaurants to approve', 'warning');
      return;
    }

    const dialogData: ConfirmationDialogData = {
      title: 'Bulk Approve',
      message: `Are you sure you want to approve ${this.selection.selected.length} restaurant(s)? This action cannot be undone.`,
      confirmText: 'Approve All',
      cancelText: 'Cancel',
      type: 'success'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ids = this.selection.selected.map(r => r.id);
        this.loading = true;
        
        this.adminService.bulkApproveRestaurants(ids).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast(`${ids.length} restaurant(s) approved successfully`, 'success');
              this.selection.clear();
              this.loadPendingRestaurants();
            } else {
              this.showToast(response.message || 'Failed to approve restaurants', 'error');
            }
          },
          error: (error) => {
            this.loading = false;
            this.showToast('Failed to approve restaurants', 'error');
            console.error('Error bulk approving restaurants:', error);
          }
        });
      }
    });
  }

  bulkReject(): void {
    if (this.selection.selected.length === 0) {
      this.showToast('Please select restaurants to reject', 'warning');
      return;
    }

    const dialogData: ConfirmationDialogData = {
      title: 'Bulk Reject',
      message: `Are you sure you want to reject ${this.selection.selected.length} restaurant(s)?`,
      confirmText: 'Reject All',
      cancelText: 'Cancel',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const ids = this.selection.selected.map(r => r.id);
        const reason = 'Bulk rejection'; // This should come from a dialog
        this.loading = true;
        
        this.adminService.bulkRejectRestaurants(ids, reason).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast(`${ids.length} restaurant(s) rejected successfully`, 'success');
              this.selection.clear();
              this.loadPendingRestaurants();
            } else {
              this.showToast(response.message || 'Failed to reject restaurants', 'error');
            }
          },
          error: (error) => {
            this.loading = false;
            this.showToast('Failed to reject restaurants', 'error');
            console.error('Error bulk rejecting restaurants:', error);
          }
        });
      }
    });
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.snackBar.openFromComponent(ToastNotificationComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  refresh(): void {
    this.loadPendingRestaurants();
  }
}