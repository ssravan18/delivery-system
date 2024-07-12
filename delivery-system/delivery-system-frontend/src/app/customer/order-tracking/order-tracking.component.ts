import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  trackingForm: FormGroup;
  orderStatus: string | null = null;

  constructor(private fb: FormBuilder) {
    this.trackingForm = this.fb.group({
      orderId: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onTrack(): void {
    if (this.trackingForm.valid) {
      const orderId = this.trackingForm.get('orderId')?.value;
      // Replace the following line with actual service call to get order status
      this.orderStatus = `Status for order ${orderId}: In transit`;
    }
  }
}
