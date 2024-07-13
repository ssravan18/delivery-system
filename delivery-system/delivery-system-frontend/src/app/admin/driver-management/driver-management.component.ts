import { Component, OnInit } from '@angular/core';
import { AdminService, Driver } from 'src/app/services/admin.service';


@Component({
  selector: 'app-driver-management',
  templateUrl: './driver-management.component.html',
  styleUrls: ['./driver-management.component.css']
})
export class DriverManagementComponent implements OnInit {

  drivers: Driver[] = [];

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.adminservice.getDrivers().subscribe(
      (data: Driver[]) => {
        this.drivers = data;
      },
      error => {
        console.error('Error fetching driver data:', error);
      }
    );
  }
}
