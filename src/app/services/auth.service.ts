import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../DTOs/UserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private http = inject(HttpClient)

  private baseUrl = "http://localhost:8080"
  logIn(email : string, password : string) {
    return this.http.get<UserDTO>(`${this.baseUrl}/login`, {params: {email, password}})
  } 
  
  setLoggedUser(userDTO : UserDTO) {
    localStorage.setItem("loggedUserRole",userDTO.role)
  }

  logOut() {
    localStorage.removeItem("loggedUserRole")
  }

  isLoggedIn():boolean {
    return !!localStorage.getItem("loggedUserRole")
  }
}
