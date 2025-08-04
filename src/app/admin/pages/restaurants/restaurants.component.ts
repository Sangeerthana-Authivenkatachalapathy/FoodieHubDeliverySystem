import { Component, OnInit } from '@angular/core';

interface Restaurant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  rating: number;
  totalOrders: number;
  joinDate: Date;
}

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  selectedStatus: string = 'all';
  selectedCuisine: string = 'all';
  searchTerm: string = '';
  loading = true;

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  cuisineOptions = [
    { value: 'all', label: 'All Cuisines' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Indian', label: 'Indian' },
    { value: 'Mexican', label: 'Mexican' },
    { value: 'Japanese', label: 'Japanese' }
  ];

  ngOnInit(): void {
    this.loadRestaurants();
  }

  private loadRestaurants(): void {
    setTimeout(() => {
      this.restaurants = [
        {
          id: 'REST001',
          name: 'Pizza Palace',
          email: 'contact@pizzapalace.com',
          phone: '+1234567890',
          address: '123 Main St, City, State',
          cuisine: 'Italian',
          status: 'Active',
          rating: 4.5,
          totalOrders: 1248,
          joinDate: new Date('2023-01-15')
        },
        {
          id: 'REST002',
          name: 'Burger House',
          email: 'info@burgerhouse.com',
          phone: '+1234567891',
          address: '456 Oak Ave, City, State',
          cuisine: 'American',
          status: 'Active',
          rating: 4.2,
          totalOrders: 987,
          joinDate: new Date('2023-03-22')
        },
        {
          id: 'REST003',
          name: 'Sushi World',
          email: 'hello@sushiworld.com',
          phone: '+1234567892',
          address: '789 Pine Rd, City, State',
          cuisine: 'Japanese',
          status: 'Suspended',
          rating: 4.8,
          totalOrders: 756,
          joinDate: new Date('2023-05-10')
        }
      ];
      this.filteredRestaurants = [...this.restaurants];
      this.loading = false;
    }, 1000);
  }

  onStatusChange(): void {
    this.filterRestaurants();
  }

  onCuisineChange(): void {
    this.filterRestaurants();
  }

  onSearch(): void {
    this.filterRestaurants();
  }

  private filterRestaurants(): void {
    this.filteredRestaurants = this.restaurants.filter(restaurant => {
      const matchesStatus = this.selectedStatus === 'all' || restaurant.status === this.selectedStatus;
      const matchesCuisine = this.selectedCuisine === 'all' || restaurant.cuisine === this.selectedCuisine;
      const matchesSearch = !this.searchTerm || 
        restaurant.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesCuisine && matchesSearch;
    });
  }

  updateRestaurantStatus(restaurantId: string, newStatus: Restaurant['status']): void {
    const restaurant = this.restaurants.find(r => r.id === restaurantId);
    if (restaurant) {
      restaurant.status = newStatus;
      this.filterRestaurants();
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}