import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-spinner-container" [class.overlay]="overlay">
      <div class="loading-spinner" [style.width.px]="size" [style.height.px]="size">
        <div class="spinner"></div>
        <div class="loading-text" *ngIf="message">{{ message }}</div>
      </div>
    </div>
  `,
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  @Input() size: number = 40;
  @Input() message: string = '';
  @Input() overlay: boolean = false;
}