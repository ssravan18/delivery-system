import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  customerCount: number = 0;
  orderCount: number = 0;
  deliveredOrderCount: number = 0;
  driverCount: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.adminService.getCustomerCount().subscribe(count => {
      this.customerCount = count;
    });

    this.adminService.getOrderCount().subscribe(count => {
      this.orderCount = count;
    });

    this.adminService.getDeliveredOrderCount().subscribe(count => {
      this.deliveredOrderCount = count;
    });

    this.adminService.getDriverCount().subscribe(count => {
      this.driverCount = count;
    });
  }
}
