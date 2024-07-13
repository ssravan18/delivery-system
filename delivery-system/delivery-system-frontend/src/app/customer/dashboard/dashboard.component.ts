import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  orders: Order[] = [];

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getCustomerOrders().subscribe(
      (data: Order[]) => {
        console.log(data);
        this.orders = data;
      },
      error => {
        console.error('Error fetching order data:', error);
      }
    );
  }

  placeNewOrder(): void {
    this.router.navigate(['/order-placement']);
  }

  trackOrder(orderId: string): void {
    this.router.navigate(['/order-tracking', { orderId }]);
  }

  giveFeedback(orderId: string): void {
    this.router.navigate(['/feedback', { orderId }]);
  }
}