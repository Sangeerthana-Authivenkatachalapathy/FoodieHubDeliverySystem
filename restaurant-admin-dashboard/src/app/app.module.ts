import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PendingRestaurantsComponent } from './features/restaurants/pending-restaurants/pending-restaurants.component';
import { ApprovedRestaurantsComponent } from './features/restaurants/approved-restaurants/approved-restaurants.component';
import { RejectedRestaurantsComponent } from './features/restaurants/rejected-restaurants/rejected-restaurants.component';
import { RestaurantDetailComponent } from './features/restaurants/restaurant-detail/restaurant-detail.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { ToastComponent } from './shared/components/toast/toast.component';

// Services
import { AuthService } from './core/services/auth.service';
import { AdminService } from './core/services/admin.service';
import { RestaurantService } from './core/services/restaurant.service';
import { LoadingService } from './core/services/loading.service';
import { ToastService } from './core/services/toast.service';

// Guards
import { authGuard } from './core/guards/auth.guard';

// Interceptors
import { authInterceptor } from './core/interceptors/auth.interceptor';

// Routes
import { routes } from './app.routes';

// Custom interceptor wrapper for class-based approach
export class AuthInterceptor {
  constructor() {}
  
  intercept(req: any, next: any) {
    return authInterceptor(req, next);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    PendingRestaurantsComponent,
    ApprovedRestaurantsComponent,
    RejectedRestaurantsComponent,
    RestaurantDetailComponent,
    LoadingSpinnerComponent,
    ConfirmDialogComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      enableTracing: false, // Set to true for debugging
      scrollPositionRestoration: 'top',
      onSameUrlNavigation: 'reload'
    }),

    // Angular Material Modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTabsModule,
    MatExpansionModule,
    MatChipsModule,
    MatBadgeModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  providers: [
    // Services
    AuthService,
    AdminService,
    RestaurantService,
    LoadingService,
    ToastService,

    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

    // Note: Guards are now functional and used directly in routes
    // authGuard is imported in app.routes.ts
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }