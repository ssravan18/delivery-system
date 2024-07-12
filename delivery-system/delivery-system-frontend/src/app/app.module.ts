import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { HomeComponent } from './common/home/home.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPlacementComponent } from './customer/order-placement/order-placement.component';
import { OrderTrackingComponent } from './customer/order-tracking/order-tracking.component';
import { FeedbackComponent } from './customer/feedback/feedback.component';
import { CustomerDashboardComponent } from './customer/dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/dashboard/dashboard.component';
import { CustomerManagementComponent } from './admin/customer-management/customer-management.component';
import { DriverManagementComponent } from './admin/driver-management/driver-management.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { DriverSignupComponent } from './driver/driver-signup/driver-signup.component';
import { PartnersComponent } from './common/partners/partners.component';
import { CustomerNavbarComponent } from './customer/customer-navbar/customer-navbar.component';
import { DriverNavbarComponent } from './driver/driver-navbar/driver-navbar.component';
import { ServicesComponent } from './common/services/services.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    PartnersComponent,
    SignupComponent,
    LoginComponent,

    CustomerDashboardComponent,
    CustomerNavbarComponent,
    OrderPlacementComponent,
    OrderTrackingComponent,
    FeedbackComponent,

    AdminDashboardComponent,
    CustomerManagementComponent,
    DriverManagementComponent,
    ReportsComponent,
    DriverSignupComponent,
    DriverNavbarComponent,
    ServicesComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // @angular/material imports
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTableDataSource
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
