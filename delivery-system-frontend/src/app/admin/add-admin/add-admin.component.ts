import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
  adminForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      this.adminService.addAdmin(this.adminForm.value).subscribe(
        response => {
          // Handle successful admin addition
          this.snackBar.open("Successfully added new admin", 'Close', { duration: 3000 });
          this.router.navigate(['/a-dashboard']);
        },
        error => {
          // Handle error
          this.snackBar.open("Error while adding admin", 'Close', { duration: 3000 });
          console.error('Error adding admin:', error);
        }
      );
    }
  }
}