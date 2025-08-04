import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = '';
  @Input() color: 'primary' | 'accent' | 'warn' | 'success' | 'info' = 'primary';
  @Input() subtitle?: string;
  @Input() trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  @Input() clickable: boolean = false;

  constructor() { }

  getCardClass(): string {
    return `stats-card stats-card--${this.color}`;
  }

  getTrendClass(): string {
    if (!this.trend) return '';
    return this.trend.isPositive ? 'trend trend--positive' : 'trend trend--negative';
  }

  getTrendIcon(): string {
    if (!this.trend) return '';
    return this.trend.isPositive ? 'trending_up' : 'trending_down';
  }
}