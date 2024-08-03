import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { MatDialog } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/order.service';
import { OrderStatusDialogComponent } from '../order-status-dialog/order-status-dialog.component';

@Component({
  selector: 'app-driver-dashboard',
  templateUrl: './driver-dashboard.component.html',
  styleUrls: ['./driver-dashboard.component.css']
})
export class DriverDashboardComponent implements OnInit {
  orders: Order[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDriverOrders();
  }

  getDriverOrders(): void {
    this.orderService.getDriverOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error fetching driver orders', error);
        this.errorMessage = 'Failed to fetch orders. Please try again later.';
      }
    );
  }

  openDialog(order: Order): void {
    const dialogRef = this.dialog.open(OrderStatusDialogComponent, {
      width: '250px',
      data: { order: order }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateOrderStatus(order.id, result);
      }
    });
  }

  updateOrderStatus(orderId: string, orderStatus: string): void {
    this.orderService.updateOrderStatus(orderId, orderStatus).subscribe(
      (updatedOrder) => {
        const index = this.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          this.orders[index].orderStatus = updatedOrder.orderStatus;
        }
      },
      (error) => console.error('Failed to update order status', error)
    );
  }

  isDelivered(order: any): boolean {
    return order.orderStatus === 'Delivered';
  }
}