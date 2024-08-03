import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

class Feedback{
  orderId!: string;
  feedback!: string;
  rating!: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8282/feedback';
  private token = localStorage.getItem('token');
  
  constructor(private http: HttpClient) { }


  submitFeedback(feedback: Feedback, orderId: string): Observable<Feedback>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<Feedback>(this.apiUrl+`/${orderId}`, feedback, { headers });
  }

}
