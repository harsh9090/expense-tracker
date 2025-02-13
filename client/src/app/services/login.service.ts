import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private apiUrl = environment.apiUrl; // ✅ Backend API URL from env file

  constructor(private http: HttpClient) { }

  getLoginDetails(userEmail: string, userPassword: string): Observable<any> {
    
    const body = {
      email: userEmail,
      password: userPassword
    };
    return this.http.post(`${this.apiUrl}/auth/login`, body, { responseType: 'text' });
  }
}
