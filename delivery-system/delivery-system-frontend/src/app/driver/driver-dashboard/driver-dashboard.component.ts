import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getDriverOrders().subscribe(
      (orders) => this.orders = orders,
      (error) => console.error('Failed to load orders', error)
    );
  }

  updateOrderStatus(orderId: string, orderStatus: string): void {
    this.orderService.updateOrderStatus(orderId, orderStatus).subscribe(
      (updatedOrder) => {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          this.orders[index].status = updatedOrder.status;
        }
      },
      (error) => console.error('Failed to update order status', error)
    );
  }
}
