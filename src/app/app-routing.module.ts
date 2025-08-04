import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: '/admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    preloadingStrategy: undefined // Can be configured for lazy loading optimization
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }