import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrls: ['./driver-signup.component.css']
})
export class DriverSignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      Name: ['', Validators.required],
      Userid: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Pincode: ['', [Validators.required, Validators.pattern('[0-9]{6}')]],
      dl: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
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
        password: this.signupForm.get('password')?.value
      };

      this.authService.signupDriver(signupData).subscribe(
        response => {
          console.log('Driver signed up successfully', response);
          this.openSnackBar('Driver signed up successfully', 'Close'); // Show success message
        },
        error => {
          console.error('Failed to signup driver', error);
          this.openSnackBar('Failed to sign up. Please try again.', 'Close'); // Show error message
        }
      );
    } else {
      this.openSnackBar('Password mismatch', 'Close'); // Show form validation error
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
