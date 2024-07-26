import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

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
      Phoneno: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid && this.signupForm.get('password')?.value === this.signupForm.get('confirmPassword')?.value) {
      const signupData = {
        id: this.signupForm.get('Userid')?.value,
        name: this.signupForm.get('Name')?.value,
        email: this.signupForm.get('email')?.value,
        phone: this.signupForm.get('Phoneno')?.value,
        password: this.signupForm.get('password')?.value
      };

      this.authService.signupCustomer(signupData).subscribe(
        response => {
          console.log('Customer signed up successfully', response);
          this.openSnackBar('Customer signed up successfully', 'Close');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Failed to signup customer', error);
          this.openSnackBar('Failed to sign up. Please try again.', 'Close');
        }
      );
    } else {
      this.openSnackBar('Password mismatch.', 'Close'); 
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
    });
  }
}