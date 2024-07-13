import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.authService.login(credentials).subscribe(
        (response) => {
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
          const role = this.authService.getrole();
          if (role === 'customer') {
            this.router.navigate(['/c-dashboard']);
          } else if (role === 'driver') {
            this.router.navigate(['/d-dashboard']);
          }
        },
        (error) => {
          this.errorMessage = error;
          this.snackBar.open("Invalid email or password", 'Close', { duration: 3000 });
          console.error('Failed to login', error);
        }
      );
    } else {
      this.errorMessage = 'Form is invalid';
      this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
    }
  }
}
