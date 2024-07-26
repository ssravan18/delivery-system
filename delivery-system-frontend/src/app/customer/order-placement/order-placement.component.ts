import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { OrderService } from 'src/app/services/order.service';

interface ordertype {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-order-placement',
  templateUrl: './order-placement.component.html',
  styleUrls: ['./order-placement.component.css']
})

export class OrderPlacementComponent implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.orderForm = this.fb.group({
      packageType: ['', Validators.required],
      packageWeight: ['', Validators.required],
      pickupAddress: ['', Validators.required],
      pickupPincode: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      orderStatus: ['order placed', ]
    });
  }

  types: ordertype[] = [
    {value: 'Books', viewValue: 'Books'},
    {value: 'Documents', viewValue: 'Documents'},
    {value: 'Clothes', viewValue: 'Clothes'},
    {value: 'Personal items', viewValue: 'Personal items'},
    {value: 'Electronics', viewValue: 'Electronics'},
    {value: 'Household items', viewValue: 'Household items'},
    {value: 'Consumables', viewValue: 'Consumables'},
    {value: 'Others', viewValue: 'Others'},
  ];

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.orderForm.valid) {
      const orderData: Order = this.orderForm.value;
      console.log('Order Data:', orderData);
      // Handle order placement logic here (e.g., send data to the server)
      this.orderService.placeOrder(orderData).subscribe(
        response => {
          console.log('Order placed successfully:', response);
          this.snackBar.open('Order placed successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/c-dashboard']);
        },
        error => {
          console.error('Failed to place order:', error);
          // Handle error appropriately
        }
      );
    }
  }
}