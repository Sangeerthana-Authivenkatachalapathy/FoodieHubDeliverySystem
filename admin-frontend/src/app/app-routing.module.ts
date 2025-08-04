import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';
import { MainLayoutComponent } from '@layout/main-layout/main-layout.component';

const routes: Routes = [
  // Redirect root to dashboard
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },

  // Authentication routes (no layout)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },

  // Main application routes (with layout)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      // User Management
      {
        path: 'users',
        loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule)
      },

      // Restaurant Management
      {
        path: 'restaurants',
        loadChildren: () => import('./features/restaurant-management/restaurant-management.module').then(m => m.RestaurantManagementModule)
      },

      // Order Management
      {
        path: 'orders',
        loadChildren: () => import('./features/order-management/order-management.module').then(m => m.OrderManagementModule)
      },

      // Delivery Partner Management
      {
        path: 'delivery-partners',
        loadChildren: () => import('./features/delivery-partner-management/delivery-partner-management.module').then(m => m.DeliveryPartnerManagementModule)
      },

      // Feedback Management
      {
        path: 'feedback',
        loadChildren: () => import('./features/feedback-management/feedback-management.module').then(m => m.FeedbackManagementModule)
      },

      // Notification Management
      {
        path: 'notifications',
        loadChildren: () => import('./features/notification-management/notification-management.module').then(m => m.NotificationManagementModule)
      }
    ]
  },

  // Wildcard route - must be last
  { 
    path: '**', 
    redirectTo: '/dashboard' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }