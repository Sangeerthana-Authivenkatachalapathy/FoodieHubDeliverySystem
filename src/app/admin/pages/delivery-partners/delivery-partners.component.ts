import { Component, OnInit } from '@angular/core';

interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  zone: string;
  status: 'Active' | 'Inactive' | 'On Delivery' | 'Offline';
  rating: number;
  totalDeliveries: number;
  joinDate: Date;
}

@Component({
  selector: 'app-admin-delivery-partners',
  templateUrl: './delivery-partners.component.html',
  styleUrls: ['./delivery-partners.component.css']
})
export class AdminDeliveryPartnersComponent implements OnInit {
  partners: DeliveryPartner[] = [];
  filteredPartners: DeliveryPartner[] = [];
  selectedStatus: string = 'all';
  selectedZone: string = 'all';
  searchTerm: string = '';
  loading = true;

  statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Delivery', label: 'On Delivery' },
    { value: 'Offline', label: 'Offline' }
  ];

  zoneOptions = [
    { value: 'all', label: 'All Zones' },
    { value: 'North', label: 'North Zone' },
    { value: 'South', label: 'South Zone' },
    { value: 'East', label: 'East Zone' },
    { value: 'West', label: 'West Zone' }
  ];

  ngOnInit(): void {
    this.loadPartners();
  }

  private loadPartners(): void {
    setTimeout(() => {
      this.partners = [
        {
          id: 'DP001',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          phone: '+1234567890',
          vehicle: 'Motorcycle',
          zone: 'North',
          status: 'Active',
          rating: 4.8,
          totalDeliveries: 245,
          joinDate: new Date('2023-06-15')
        },
        {
          id: 'DP002',
          name: 'Sarah Wilson',
          email: 'sarah@example.com',
          phone: '+1234567891',
          vehicle: 'Bicycle',
          zone: 'South',
          status: 'On Delivery',
          rating: 4.9,
          totalDeliveries: 189,
          joinDate: new Date('2023-08-20')
        },
        {
          id: 'DP003',
          name: 'Mike Brown',
          email: 'mike@example.com',
          phone: '+1234567892',
          vehicle: 'Car',
          zone: 'East',
          status: 'Offline',
          rating: 4.2,
          totalDeliveries: 312,
          joinDate: new Date('2023-03-10')
        }
      ];
      this.filteredPartners = [...this.partners];
      this.loading = false;
    }, 1000);
  }

  onStatusChange(): void {
    this.filterPartners();
  }

  onZoneChange(): void {
    this.filterPartners();
  }

  onSearch(): void {
    this.filterPartners();
  }

  private filterPartners(): void {
    this.filteredPartners = this.partners.filter(partner => {
      const matchesStatus = this.selectedStatus === 'all' || partner.status === this.selectedStatus;
      const matchesZone = this.selectedZone === 'all' || partner.zone === this.selectedZone;
      const matchesSearch = !this.searchTerm || 
        partner.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        partner.phone.includes(this.searchTerm);
      
      return matchesStatus && matchesZone && matchesSearch;
    });
  }

  updatePartnerStatus(partnerId: string, newStatus: DeliveryPartner['status']): void {
    const partner = this.partners.find(p => p.id === partnerId);
    if (partner) {
      partner.status = newStatus;
      this.filterPartners();
    }
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}