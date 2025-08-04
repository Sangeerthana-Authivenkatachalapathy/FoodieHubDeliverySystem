import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';

// Components
import { AdminNavbarComponent } from './components/navbar/navbar.component';
import { AdminSidebarComponent } from './components/sidebar/sidebar.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';

// Pages
import { AdminDashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminOrdersComponent } from './pages/orders/orders.component';
import { AdminFeedbackComponent } from './pages/feedback/feedback.component';
import { AdminDeliveryPartnersComponent } from './pages/delivery-partners/delivery-partners.component';
import { AdminRestaurantsComponent } from './pages/restaurants/restaurants.component';
import { AdminNotificationsComponent } from './pages/notifications/notifications.component';

// Services
import { AdminService } from './services/admin.service';

@NgModule({
  declarations: [
    // Components
    AdminNavbarComponent,
    AdminSidebarComponent,
    StatsCardComponent,
    
    // Pages
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminFeedbackComponent,
    AdminDeliveryPartnersComponent,
    AdminRestaurantsComponent,
    AdminNotificationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule
  ],
  providers: [
    AdminService
  ],
  exports: [
    AdminNavbarComponent,
    AdminSidebarComponent,
    StatsCardComponent
  ]
})
export class AdminModule { }