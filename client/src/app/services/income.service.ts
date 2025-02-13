import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  getCategoryWiseIncome(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(`${this.apiUrl}/reports/category-wise-income`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  getIncome(): Observable<any> {
    return this.http.get(`${this.apiUrl}/income`, { headers: this.getAuthHeaders() });
  }

  addIncome(income: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/income`, income, { headers: this.getAuthHeaders() });
  }

  updateIncome(id: string, income: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/income/${id}`, income, { headers: this.getAuthHeaders() });
  }

  deleteIncome(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/income/${id}`, { headers: this.getAuthHeaders() });
  }
  getIncomeByCategory(category: string): Observable<any> {

    return this.http.get(`${this.apiUrl}/income/source/${category}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
}
