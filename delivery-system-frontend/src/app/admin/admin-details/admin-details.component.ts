import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/Admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})

export class AdminDetailsComponent implements OnInit {

  admins: Admin[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe(
      (data: Admin[]) => {
        this.admins = data;
      },
      (error: any) => {
        console.error('Error fetching admin data:', error);
      }
    );
  }
}
