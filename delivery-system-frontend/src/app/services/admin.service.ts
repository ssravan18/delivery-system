import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { Driver } from '../models/Driver';
import { Customer } from '../models/Customer';
import { Admin } from '../models/Admin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  private driverUrl = 'http://localhost:8282/drivers';
  private adminUrl = 'http://localhost:8282/admin';
  private orderUrl = 'http://localhost:8282/orders';
  private token = localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  

  addAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.adminUrl+'/add-admin', admin, { headers: this.headers });
  }

  getDriverById(driverId: string): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.driverUrl+driverId, { headers: this.headers });
  }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.adminUrl, { headers: this.headers });
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.adminUrl+'/drivers', { headers: this.headers });
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.adminUrl+'/customers', { headers: this.headers });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.orderUrl, { headers: this.headers });
  }

  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.adminUrl}/customers-count`, { headers: this.headers });
  }

  getOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.adminUrl}/orders-count`, { headers: this.headers });
  }

  getDeliveredOrderCount(): Observable<number> {
    return this.http.get<number>(`${this.adminUrl}/delivered/orders-count`, { headers: this.headers });
  }

  getDriverCount(): Observable<number> {
    return this.http.get<number>(`${this.adminUrl}/drivers-count`, { headers: this.headers });
  }
  
}
