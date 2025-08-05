import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'restaurants',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'pending',
        pathMatch: 'full'
      },
      {
        path: 'pending',
        loadComponent: () => import('./features/restaurants/pending-restaurants/pending-restaurants.component').then(m => m.PendingRestaurantsComponent)
      },
      {
        path: 'approved',
        loadComponent: () => import('./features/restaurants/approved-restaurants/approved-restaurants.component').then(m => m.ApprovedRestaurantsComponent)
      },
      {
        path: 'rejected',
        loadComponent: () => import('./features/restaurants/rejected-restaurants/rejected-restaurants.component').then(m => m.RejectedRestaurantsComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./features/restaurants/restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];