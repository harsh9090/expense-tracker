import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMonthlySummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reports/monthly-summary`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
  }
}
