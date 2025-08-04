import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() icon: string = '';
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() trend?: {
    value: number;
    direction: 'up' | 'down';
  };

  get cardClass(): string {
    return `stats-card stats-card--${this.color}`;
  }

  get trendClass(): string {
    if (!this.trend) return '';
    return `trend trend--${this.trend.direction}`;
  }
}