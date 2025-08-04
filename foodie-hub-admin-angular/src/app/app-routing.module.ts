import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { RestaurantManagementComponent } from './components/restaurant-management/restaurant-management.component';
import { DeliveryPartnerManagementComponent } from './components/delivery-partner-management/delivery-partner-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { FeedbackManagementComponent } from './components/feedback-management/feedback-management.component';
import { NotificationManagementComponent } from './components/notification-management/notification-management.component';
import { FinancialReportsComponent } from './components/financial-reports/financial-reports.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserManagementComponent },
      { path: 'restaurants', component: RestaurantManagementComponent },
      { path: 'delivery-partners', component: DeliveryPartnerManagementComponent },
      { path: 'orders', component: OrderManagementComponent },
      { path: 'feedback', component: FeedbackManagementComponent },
      { path: 'notifications', component: NotificationManagementComponent },
      { path: 'reports', component: FinancialReportsComponent }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }