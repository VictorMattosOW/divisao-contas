import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth-services.service'
import { AuthStateService } from 'src/app/services/auth-state.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token')
    this.isLoggedIn = !!token
  }

  logout() {
    this.authService.logout()
    this.authStateService.setLoggedIn(false)
    this.router.navigate(['/login'])
  }
}