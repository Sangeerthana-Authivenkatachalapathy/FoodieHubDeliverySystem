import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface ToastData {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  action?: string;
}

@Component({
  selector: 'app-toast-notification',
  template: `
    <div class="toast-notification" [class]="'toast-' + data.type">
      <mat-icon class="toast-icon">{{ getIcon() }}</mat-icon>
      <span class="toast-message">{{ data.message }}</span>
      <button 
        *ngIf="data.action"
        mat-icon-button 
        (click)="dismiss()"
        class="toast-action">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./toast-notification.component.css']
})
export class ToastNotificationComponent {

  constructor(
    public snackBarRef: MatSnackBarRef<ToastNotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: ToastData
  ) {}

  dismiss(): void {
    this.snackBarRef.dismiss();
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}