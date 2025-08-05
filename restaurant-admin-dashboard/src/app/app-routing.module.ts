import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, GuestGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // Redirect root to dashboard if authenticated, otherwise to login
  {
    path: '',
    redirectTo: '/admin/dashboard',
    pathMatch: 'full'
  },

  // Authentication routes
  {
    path: 'auth',
    canActivate: [GuestGuard],
    children: [
      {
        path: 'login',
        loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },

  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
      },
      {
        path: 'pending-restaurants',
        loadChildren: () => import('./features/admin/pending-restaurants/pending-restaurants.module').then(m => m.PendingRestaurantsModule)
      },
      {
        path: 'approved-restaurants',
        loadChildren: () => import('./features/admin/approved-restaurants/approved-restaurants.module').then(m => m.ApprovedRestaurantsModule)
      },
      {
        path: 'rejected-restaurants',
        loadChildren: () => import('./features/admin/rejected-restaurants/rejected-restaurants.module').then(m => m.RejectedRestaurantsModule)
      },
      {
        path: 'restaurant-details/:id',
        loadChildren: () => import('./features/admin/restaurant-details/restaurant-details.module').then(m => m.RestaurantDetailsModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/admin/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }