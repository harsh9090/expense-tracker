import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = environment.apiUrl; // ✅ Backend API URL from env file

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/expenses`, {
      responseType: 'json',
      headers: {
      'Authorization': `Bearer ${token}`
      }
    });
  }

  addExpense(expense: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/expenses`, expense, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  updateExpense(id: string, expense: any): Observable<any> {
    console.log(`${this.apiUrl}/expenses/${id}`)
    return this.http.put(`${this.apiUrl}/expenses/${id}`, expense, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  deleteExpense(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/expenses/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
