import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { OrderStatusDialogComponent } from 'src/app/driver/order-status-dialog/order-status-dialog.component';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private adminservice: AdminService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.adminservice.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
      },
      error => {
        console.error('Error fetching customer data:', error);
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
}