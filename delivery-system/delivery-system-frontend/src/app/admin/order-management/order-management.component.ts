import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Order';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];

  constructor(private adminservice: AdminService) {}

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
}