import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/Driver';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {
  driver: Driver | null = null;
  loading: boolean = true;

  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.getDriverProfile();
  }

  getDriverProfile(): void {
    const driverId = localStorage.getItem('id');
    if (driverId) {
      this.adminservice.getDriverById(driverId).subscribe(
        (Response) => {
          // this.driver = Response;
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching driver profile:', error);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
  
}
