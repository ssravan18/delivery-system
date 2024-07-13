import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.guard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const expectedRole = route.data['role'];

    return this.authService.getUserRoleStatus().pipe(
      map(userRole => {
        if (userRole !== expectedRole) {
          console.log(expectedRole,userRole);
          this.router.navigate(['/access-denied']);
          return false;
        }
        return true;
      })
    );
  }
}
