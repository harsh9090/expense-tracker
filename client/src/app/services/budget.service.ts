import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ Fetch budgets for the logged-in user
  getBudgets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/budgets`, { headers: this.getAuthHeaders() });
  }

  // ✅ Create a new budget
  addBudget(budget: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/budgets`, budget, { headers: this.getAuthHeaders() });
  }

  // ✅ Update a budget
  updateBudget(id: string, budget: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/budgets/${id}`, budget, { headers: this.getAuthHeaders() });
  }

  // ✅ Delete a budget
  deleteBudget(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/budgets/${id}`, { headers: this.getAuthHeaders() });
  }
  getBudgetWarnings(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/budgets/warnings`, { headers: this.getAuthHeaders() });
  }

}
