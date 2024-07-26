import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})

export class CustomerManagementComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.adminService.getCustomers().subscribe(
      (data: Customer[]) => {
        this.customers = data;
      },
      error => {
        console.error('Error fetching customer data:', error);
      }
    );
  }
}