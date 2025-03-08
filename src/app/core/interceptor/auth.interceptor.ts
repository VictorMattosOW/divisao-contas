import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Recupera o token do localStorage
    const token = localStorage.getItem('token')

    // Se o token existir, adiciona ao cabeçalho da requisição
    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
      return next.handle(clonedRequest)
    }

    // Se não houver token, passa a requisição sem modificações
    return next.handle(request)
  }
}