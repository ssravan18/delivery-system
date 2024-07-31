import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';


  constructor(
    private router: Router, 
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCustomerOrders();
  }

  getCustomerOrders(): void {
    this.orderService.getCustomerOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching customer orders', error);
        this.errorMessage = 'Failed to fetch orders. Please try again later.';
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

  cancelOrder(order: Order): void {
    if (order.orderStatus === 'Order Placed') {
      this.orderService.cancelOrder(order.id).subscribe(
        response => {
          order.orderStatus = 'Cancelled';
          this.openSnackBar('Order cancelled successfully', 'Close');
        },
        error => {
          console.error('Error cancelling order:', error);
          this.openSnackBar('Failed to cancel order. Please try again.', 'Close');
        }
      );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}