import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/users';
  constructor(private http : HttpClient) {
    
   }
   
   emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/emailAvailable`, {
      params: { email },
    });
  }

  postUser(user : FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/postUser`,user)
  }
  
}
