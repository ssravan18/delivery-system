import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Order';

// customer model
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// driver model
export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private driverUrl = 'http://localhost:8282/admin/drivers';
  private customerUrl = 'http://localhost:8282/admin/customers';
  private orderUrl = 'http://localhost:8282/orders';
  private token = localStorage.getItem('token');

  constructor(private http: HttpClient) {}

  getDrivers(): Observable<Driver[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Driver[]>(this.driverUrl, { headers });
  }

  getCustomers(): Observable<Customer[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Customer[]>(this.customerUrl, { headers });
  }

  getOrders(): Observable<Order[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<Order[]>(this.orderUrl, { headers });
  }
  
}
