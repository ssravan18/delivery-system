import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8282/orders';
  private token = localStorage.getItem('token');
  
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    
    return this.http.get<Order[]>(this.baseUrl, { headers: this.headers });
  }

  getCustomerOrders(): Observable<Order[]> {
    const customerId = localStorage.getItem('id');

    if (!this.token || !customerId) {
      throw new Error('Token or customer ID is missing');
    }


    return this.http.get<Order[]>(`${this.baseUrl}/customer/${customerId}`, { headers: this.headers });
  }

  getDriverOrders(): Observable<Order[]> {

    const driverId = localStorage.getItem('id'); // Assuming driver ID is stored in localStorage
    return this.http.get<Order[]>(`${this.baseUrl}/driver/${driverId}`, { headers: this.headers });
  }

  getOrdersByCustomerId(customerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customer/${customerId}`, { headers: this.headers });
  }

  getOrdersByDriverId(driverId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/driver/${driverId}`, { headers: this.headers });
  }


  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order, { headers: this.headers });
  }

  tackOrder(id: string): Observable<Order>{
    return this.http.get<Order>(this.baseUrl+"/status/"+id, { headers: this.headers });
  }
  updateOrderStatus(orderId: string, orderStatus: string): Observable<Order> {
    const url = `${this.baseUrl}/${orderId}/status`;
    console.log(orderStatus);
    return this.http.patch<Order>(url, { orderStatus }, { headers: this.headers });
  }

  updateDeliverytime(orderId: string, feedback: string): Observable<Order> {
    const url = `${this.baseUrl}/${orderId}/feedback`;
    return this.http.patch<Order>(url, { feedback }, { headers: this.headers });
  }

  updateOrderDeliveryTime(orderId: string, deliveryTime: string): Observable<Order> {
    const url = `${this.baseUrl}/${orderId}/deliveryTime`;
    return this.http.patch<Order>(url, { deliveryTime }, { headers: this.headers });
  }
  
  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${orderId}`, { headers: this.headers });
  }
}
