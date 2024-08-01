import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/models/Order';

@Component({
  selector: 'app-order-status-dialog',
  templateUrl: './order-status-dialog.component.html',
  styleUrls: ['./order-status-dialog.component.css']
})
export class OrderStatusDialogComponent {
  newStatus!: string;
  statuses: string[] = ['Order picked', 'Shipped', 'Out for delivery', 'Delivered', 'Canceled'];

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order }
  ) {}

  onNoClick(): void {
    this.snackBar.open('Order Status Updated successfully', 'Close', { duration: 3000 });
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.snackBar.open('Order Status Updated successfully', 'Close', { duration: 3000 });
  }
}
