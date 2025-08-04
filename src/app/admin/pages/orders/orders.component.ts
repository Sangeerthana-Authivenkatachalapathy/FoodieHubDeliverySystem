import { Component, OnInit } from '@angular/core';

interface Order {
  id: string;
  customerName: string;
  restaurant: string;
  items: string[];
  amount: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderTime: Date;
  deliveryTime?: Date;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedStatus: string = 'all';
  searchTerm: string = '';
  loading = true;

  statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Preparing', label: 'Preparing' },
    { value: 'Out for Delivery', label: 'Out for Delivery' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    // Simulate API call
    setTimeout(() => {
      this.orders = [
        {
          id: '#1234',
          customerName: 'John Doe',
          restaurant: 'Pizza Palace',
          items: ['Margherita Pizza', 'Coke'],
          amount: 45.99,
          status: 'Delivered',
          orderTime: new Date('2024-01-15T14:30:00'),
          deliveryTime: new Date('2024-01-15T15:15:00')
        },
        {
          id: '#1235',
          customerName: 'Jane Smith',
          restaurant: 'Burger House',
          items: ['Cheese Burger', 'Fries'],
          amount: 32.50,
          status: 'Preparing',
          orderTime: new Date('2024-01-15T15:00:00')
        },
        {
          id: '#1236',
          customerName: 'Mike Johnson',
          restaurant: 'Sushi World',
          items: ['California Roll', 'Miso Soup'],
          amount: 78.25,
          status: 'Out for Delivery',
          orderTime: new Date('2024-01-15T15:30:00')
        }
      ];
      this.filteredOrders = [...this.orders];
      this.loading = false;
    }, 1000);
  }

  onStatusChange(): void {
    this.filterOrders();
  }

  onSearch(): void {
    this.filterOrders();
  }

  private filterOrders(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = this.selectedStatus === 'all' || order.status === this.selectedStatus;
      const matchesSearch = !this.searchTerm || 
        order.id.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.restaurant.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Delivered') {
        order.deliveryTime = new Date();
      }
      this.filterOrders();
    }
  }
}