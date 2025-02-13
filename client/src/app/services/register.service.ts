import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl; // ✅ Backend API URL from env file

  constructor(private http: HttpClient) { }

  getRegisterDetails(userEmail: string, userPassword: string,userName:string): Observable<any> {
    const body = {
      email: userEmail, 
      password: userPassword,
      name:userName
    };
    return this.http.post(`${this.apiUrl}/auth/register`, body, { responseType: 'text' });
  }
}
