import { Component, OnInit } from '@angular/core';

interface Feedback {
  id: string;
  customerName: string;
  orderId: string;
  restaurant: string;
  rating: number;
  comment: string;
  date: Date;
  status: 'New' | 'Reviewed' | 'Resolved';
}

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  selectedRating: string = 'all';
  selectedStatus: string = 'all';
  loading = true;

  ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'New', label: 'New' },
    { value: 'Reviewed', label: 'Reviewed' },
    { value: 'Resolved', label: 'Resolved' }
  ];

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  private loadFeedbacks(): void {
    setTimeout(() => {
      this.feedbacks = [
        {
          id: 'FB001',
          customerName: 'John Doe',
          orderId: '#1234',
          restaurant: 'Pizza Palace',
          rating: 5,
          comment: 'Excellent food and fast delivery!',
          date: new Date('2024-01-15T16:30:00'),
          status: 'New'
        },
        {
          id: 'FB002',
          customerName: 'Jane Smith',
          orderId: '#1235',
          restaurant: 'Burger House',
          rating: 3,
          comment: 'Food was okay but delivery was late.',
          date: new Date('2024-01-15T17:00:00'),
          status: 'Reviewed'
        },
        {
          id: 'FB003',
          customerName: 'Mike Johnson',
          orderId: '#1236',
          restaurant: 'Sushi World',
          rating: 1,
          comment: 'Food was cold and tasted terrible.',
          date: new Date('2024-01-15T18:00:00'),
          status: 'New'
        }
      ];
      this.filteredFeedbacks = [...this.feedbacks];
      this.loading = false;
    }, 1000);
  }

  onRatingChange(): void {
    this.filterFeedbacks();
  }

  onStatusChange(): void {
    this.filterFeedbacks();
  }

  private filterFeedbacks(): void {
    this.filteredFeedbacks = this.feedbacks.filter(feedback => {
      const matchesRating = this.selectedRating === 'all' || feedback.rating.toString() === this.selectedRating;
      const matchesStatus = this.selectedStatus === 'all' || feedback.status === this.selectedStatus;
      return matchesRating && matchesStatus;
    });
  }

  updateFeedbackStatus(feedbackId: string, newStatus: Feedback['status']): void {
    const feedback = this.feedbacks.find(f => f.id === feedbackId);
    if (feedback) {
      feedback.status = newStatus;
      this.filterFeedbacks();
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}