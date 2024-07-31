import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/Order'; // Ensure you have the Order interface/model

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  trackingForm: FormGroup;
  orderStatus: string | null = null;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.trackingForm = this.fb.group({
      orderId: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onTrack(): void {
    if (this.trackingForm.valid) {
      this.id = this.trackingForm.get('orderId')?.value;
      this.orderService.tackOrder(this.id).subscribe(
        (order) => {
          if (order !== null) {
            this.orderStatus = order.orderStatus;
          }
          else {
            this.orderStatus = 'Order not found';
          }
        },
        error => {
          console.error('Failed to track order:', error);
          // Handle error appropriately, such as displaying a message to the user
          this.orderStatus = 'Error tracking order. Please try again.';
        }
      );
    }
  }
}
