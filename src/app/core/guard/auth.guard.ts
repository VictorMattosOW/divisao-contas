import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica se o token existe no localStorage
    const token = localStorage.getItem('token')
    if (token) {
      return true // Permite o acesso à rota
    } else {
      // Redireciona para a página de login
      this.router.navigate(['/login'])
      return false // Bloqueia o acesso à rota
    }
  }
}