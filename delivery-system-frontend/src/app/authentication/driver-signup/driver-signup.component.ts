import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface VehicleType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.css']
})
export class DriverSignupComponent implements OnInit {
  signupForm: FormGroup;
  vehicleTypes: VehicleType[] = [
    { value: 'bike', viewValue: 'Bike' },
    { value: 'auto', viewValue: 'Auto' },
    { value: 'van', viewValue: 'Van' },
    { value: 'truck', viewValue: 'Truck' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      Name: ['', Validators.required],
      Userid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      dl: ['', Validators.required],
      vehicleType: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid && this.signupForm.get('password')?.value === this.signupForm.get('confirmPassword')?.value) {
      const signupData = {
        name: this.signupForm.get('Name')?.value,
        id: this.signupForm.get('Userid')?.value,
        email: this.signupForm.get('email')?.value,
        phone: this.signupForm.get('phoneNumber')?.value,
        drivingLicense: this.signupForm.get('dl')?.value,
        pincode: this.signupForm.get('Pincode')?.value,
        vehicle: this.signupForm.get('vehicleType')?.value,
        password: this.signupForm.get('password')?.value
      };

      this.authService.signupDriver(signupData).subscribe(
        response => {
          console.log('Driver signed up successfully', response);
          this.openSnackBar('Driver signed up successfully', 'Close');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Failed to signup driver', error);
          this.openSnackBar('Failed to sign up. Please try again.', 'Close');
        }
      );
    } else {
      this.openSnackBar('Password mismatch', 'Close');
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { 'passwordMismatch': true };
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
