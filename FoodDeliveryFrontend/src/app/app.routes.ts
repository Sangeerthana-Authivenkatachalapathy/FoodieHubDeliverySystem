import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', loadComponent: () => import('./components/welcome/welcome.component').then(m => m.WelcomeComponent) },
  { path: 'customer', loadComponent: () => import('./components/customer/customer-dashboard/customer-dashboard.component').then(m => m.CustomerDashboardComponent) },
  { path: 'restaurant', loadComponent: () => import('./components/restaurant/restaurant-dashboard/restaurant-dashboard.component').then(m => m.RestaurantDashboardComponent) },
  { path: 'delivery', loadComponent: () => import('./components/delivery/delivery-dashboard/delivery-dashboard.component').then(m => m.DeliveryDashboardComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
  { path: 'restaurants/:pincode', loadComponent: () => import('./components/customer/restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent) },
  { path: 'restaurant/:id/menu', loadComponent: () => import('./components/customer/restaurant-menu/restaurant-menu.component').then(m => m.RestaurantMenuComponent) },
  { path: 'cart', loadComponent: () => import('./components/customer/cart/cart.component').then(m => m.CartComponent) },
  { path: 'register', loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'payment', loadComponent: () => import('./components/customer/payment/payment.component').then(m => m.PaymentComponent) },
  { path: '**', redirectTo: '/welcome' }
];