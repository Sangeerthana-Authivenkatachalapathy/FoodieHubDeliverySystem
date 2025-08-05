import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../core/services/admin.service';
import { Restaurant } from '../../../core/models/restaurant.model';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ToastNotificationComponent } from '../../../shared/components/toast-notification/toast-notification.component';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant | null = null;
  loading = false;
  restaurantId: string;
  selectedImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.restaurantId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.loadRestaurantDetails();
  }

  private loadRestaurantDetails(): void {
    this.loading = true;
    
    this.adminService.getRestaurantById(this.restaurantId).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.restaurant = response.data;
        } else {
          this.showToast('Restaurant not found', 'error');
          this.router.navigate(['/admin/pending-restaurants']);
        }
      },
      error: (error) => {
        this.loading = false;
        this.showToast('Error loading restaurant details', 'error');
        console.error('Error loading restaurant:', error);
        this.router.navigate(['/admin/pending-restaurants']);
      }
    });
  }

  approveRestaurant(): void {
    if (!this.restaurant) return;

    const dialogData: ConfirmationDialogData = {
      title: 'Approve Restaurant',
      message: `Are you sure you want to approve "${this.restaurant.name}"? This action cannot be undone.`,
      confirmText: 'Approve',
      cancelText: 'Cancel',
      type: 'success'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.restaurant) {
        this.loading = true;
        this.adminService.approveRestaurant(this.restaurant.id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast('Restaurant approved successfully', 'success');
              this.loadRestaurantDetails(); // Reload to get updated data
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

  rejectRestaurant(): void {
    if (!this.restaurant) return;

    const dialogData: ConfirmationDialogData = {
      title: 'Reject Restaurant',
      message: `Are you sure you want to reject "${this.restaurant.name}"? Please provide a reason for rejection.`,
      confirmText: 'Reject',
      cancelText: 'Cancel',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.restaurant) {
        // In a real implementation, you would show a dialog to get rejection reason
        const reason = 'Documents incomplete or invalid'; // This should come from a dialog
        
        this.loading = true;
        this.adminService.rejectRestaurant(this.restaurant.id, reason).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success) {
              this.showToast('Restaurant rejected successfully', 'success');
              this.loadRestaurantDetails(); // Reload to get updated data
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

  goBack(): void {
    this.router.navigate(['/admin/pending-restaurants']);
  }

  downloadDocument(documentType: string): void {
    if (!this.restaurant) return;

    this.adminService.downloadDocument(this.restaurant.id, documentType).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.restaurant?.name}_${documentType}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        this.showToast('Failed to download document', 'error');
        console.error('Error downloading document:', error);
      }
    });
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#666';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending': return 'schedule';
      case 'approved': return 'check_circle';
      case 'rejected': return 'cancel';
      default: return 'info';
    }
  }

  formatOperatingHours(day: any): string {
    if (day.isClosed) return 'Closed';
    return `${day.open} - ${day.close}`;
  }

  private showToast(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.snackBar.openFromComponent(ToastNotificationComponent, {
      data: { message, type },
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}