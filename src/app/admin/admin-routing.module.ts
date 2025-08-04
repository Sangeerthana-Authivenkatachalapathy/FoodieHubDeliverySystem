import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminOrdersComponent } from './pages/orders/orders.component';
import { AdminFeedbackComponent } from './pages/feedback/feedback.component';
import { AdminDeliveryPartnersComponent } from './pages/delivery-partners/delivery-partners.component';
import { AdminRestaurantsComponent } from './pages/restaurants/restaurants.component';
import { AdminNotificationsComponent } from './pages/notifications/notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'orders',
    component: AdminOrdersComponent,
    data: { title: 'Orders Management' }
  },
  {
    path: 'restaurants',
    component: AdminRestaurantsComponent,
    data: { title: 'Restaurant Management' }
  },
  {
    path: 'delivery-partners',
    component: AdminDeliveryPartnersComponent,
    data: { title: 'Delivery Partners' }
  },
  {
    path: 'feedback',
    component: AdminFeedbackComponent,
    data: { title: 'Customer Feedback' }
  },
  {
    path: 'notifications',
    component: AdminNotificationsComponent,
    data: { title: 'Notifications' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }