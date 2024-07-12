import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8282/orders';
  private token = localStorage.getItem('token');
  

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Order[]>(this.apiUrl, { headers });
  }

  getCustomerOrders(): Observable<Order[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    const customerId = localStorage.getItem('id');
    return this.http.get<Order[]>(`${this.apiUrl}/customer/${customerId}`, { headers });
  }

  placeOrder(order: Order): Observable<Order> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Order>(this.apiUrl, order, { headers });
  }

  tackOrder(id: string): Observable<Order[]>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<Order[]>(this.apiUrl+"/"+id, { headers });
  }
  updateOrderStatus(orderId: string, orderStatus: string): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}/status`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch<Order>(url, { orderStatus }, { headers });
  }

  updateOrderFeedback(orderId: string, feedback: string): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}/feedback`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch<Order>(url, { feedback }, { headers });
  }

  updateDeliverytime(orderId: string, feedback: string): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}/feedback`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch<Order>(url, { feedback }, { headers });
  }

  updateOrderDeliveryTime(orderId: string, deliveryTime: string): Observable<Order> {
    const url = `${this.apiUrl}/${orderId}/deliveryTime`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch<Order>(url, { deliveryTime }, { headers });
  }
  
}
