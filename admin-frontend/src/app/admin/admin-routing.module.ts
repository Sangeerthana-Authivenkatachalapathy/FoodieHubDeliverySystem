import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./pages/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'feedback',
        loadChildren: () => import('./pages/feedback/feedback.module').then(m => m.FeedbackModule)
      },
      {
        path: 'delivery-partners',
        loadChildren: () => import('./pages/delivery-partners/delivery-partners.module').then(m => m.DeliveryPartnersModule)
      },
      {
        path: 'restaurants',
        loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then(m => m.NotificationsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }