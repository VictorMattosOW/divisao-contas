import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  login(credenciais: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/sessions`, credenciais)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken(): string | null {
    const token = localStorage.getItem('token')
    return token
  }
}
