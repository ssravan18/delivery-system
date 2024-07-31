import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private signupUrl = 'http://localhost:8282/signup';
  private loginUrl = 'http://localhost:8282/login';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRole = new BehaviorSubject<string | null>(this.getrole());
  authStatusListener = this.authStatus.asObservable();

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  signupCustomer(customer: any): Observable<any> {
    return this.http.post(this.signupUrl+'/customer', customer, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  signupDriver(driver: any): Observable<any> {
    return this.http.post(this.signupUrl+'/driver', driver, { headers: this.headers }).pipe(
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    
    return this.http.post(this.loginUrl, credentials, { headers: this.headers }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        localStorage.setItem('id', response.id);
        this.userRole = new BehaviorSubject<string | null>(this.getrole());
        console.log("from auth service",this.userRole);
      }),
      catchError(this.handleError)
    );
  }

  logout() {
    localStorage.clear();
    this.authStatus.next(false);
    this.userRole.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getrole(): string | null {
    return localStorage.getItem('role');
  }

  getId(): string | null {
    return localStorage.getItem('id');
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getUserRoleStatus(): Observable<string | null> {
    return this.userRole.asObservable();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
