import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/Driver';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {
  driver: Driver = {
    id: '',
    name: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.driverService.getDriverProfile().subscribe(
      (driver) => this.driver = driver,
      (error) => console.error('Failed to load profile', error)
    );
  }

  updateProfile(): void {
    // Logic to update driver profile
    this.driverService.updateDriverProfile(this.driver).subscribe(
      (response) => {
        console.log('Profile updated successfully', response);
        // Display success message or perform other actions
      },
      (error) => console.error('Failed to update profile', error)
    );
  }
}
