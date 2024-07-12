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
import { DriverSignupComponent } from './driver/driver-signup/driver-signup.component';
import { ServicesComponent } from './common/services/services.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { DriverNavbarComponent } from './driver/driver-navbar/driver-navbar.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'driverSignup', component: DriverSignupComponent },
  
  { path: 'c-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'customer' }},
  { path: 'order-placement', component: OrderPlacementComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'customer' } },
  { path: 'track-order', component: OrderTrackingComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'customer' } },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'customer' } },

  { path: 'd-dashboard', component: DriverNavbarComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'driver' } },

  { path: 'a-dashboard', component: AdminDashboardComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
