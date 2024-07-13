import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './common/home/home.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CustomerDashboardComponent } from './customer/dashboard/dashboard.component';
import { OrderPlacementComponent } from './customer/order-placement/order-placement.component';
import { OrderTrackingComponent } from './customer/order-tracking/order-tracking.component';
import { FeedbackComponent } from './customer/feedback/feedback.component';
import { PartnersComponent } from './common/partners/partners.component';
import { ServicesComponent } from './common/services/services.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DriverSignupComponent } from './driver/driver-signup/driver-signup.component';
import { DriverNavbarComponent } from './driver/driver-navbar/driver-navbar.component';
import { DriverOrderStatusComponent } from './driver/driver-order-status/driver-order-status.component';
import { DriverProfileComponent } from './driver/driver-profile/driver-profile.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomerManagementComponent } from './admin/customer-management/customer-management.component';
import { DriverManagementComponent } from './admin/driver-management/driver-management.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'driverSignup', component: DriverSignupComponent },
  
  { path: 'c-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard]},
  { path: 'order-placement', component: OrderPlacementComponent, canActivate: [AuthGuard] },
  { path: 'track-order', component: OrderTrackingComponent, canActivate: [AuthGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },

  { path: 'd-dashboard', component: DriverNavbarComponent, canActivate: [AuthGuard] },
  { path: 'd-profile', component: DriverProfileComponent, canActivate: [AuthGuard] },
  { path: 'd-order-status', component: DriverOrderStatusComponent, canActivate: [AuthGuard] },

  { path: 'a-dashboard', component: AdminDashboardComponent },
  { path: 'customer-details', component: CustomerManagementComponent },
  { path: 'driver-details', component: DriverManagementComponent },
  { path: 'order-details', component: OrderManagementComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
