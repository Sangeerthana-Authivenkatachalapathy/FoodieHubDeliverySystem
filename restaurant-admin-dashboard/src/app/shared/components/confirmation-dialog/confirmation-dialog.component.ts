import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'danger' | 'info' | 'success';
}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="confirmation-dialog">
      <div class="dialog-header" [class]="'dialog-header-' + data.type">
        <mat-icon>{{ getIcon() }}</mat-icon>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      
      <div mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </div>
      
      <div mat-dialog-actions class="dialog-actions">
        <button 
          mat-button 
          (click)="onCancel()"
          class="cancel-btn">
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button 
          mat-raised-button 
          [color]="getButtonColor()"
          (click)="onConfirm()"
          class="confirm-btn">
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    this.data.type = this.data.type || 'info';
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getIcon(): string {
    switch (this.data.type) {
      case 'warning': return 'warning';
      case 'danger': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }

  getButtonColor(): string {
    switch (this.data.type) {
      case 'danger': return 'warn';
      case 'success': return 'primary';
      default: return 'primary';
    }
  }
}