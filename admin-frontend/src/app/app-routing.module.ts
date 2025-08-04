import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  // Redirect root to admin
  { 
    path: '', 
    redirectTo: '/admin', 
    pathMatch: 'full' 
  },

  // Authentication routes (no layout)
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)
  },

  // Admin routes (with admin layout)
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard]
  },

  // Wildcard route - must be last
  { 
    path: '**', 
    redirectTo: '/admin' 
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