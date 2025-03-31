import { Component, OnInit } from '@angular/core'
import { Users } from '../models/users.model'
import { Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { UsersService } from 'src/app/services/users.service'
import { AuthService } from 'src/app/services/auth-services.service'
import { AuthStateService } from 'src/app/services/auth-state.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    this.authStateService.setLoggedIn(false)
    const token = this.authService.getToken()
    if (token) {
      this.router.navigate(['ambiente'])
    }
  }

  abaAtiva: 'criar' | 'logar' = 'criar'; // Controla a aba ativa
  errorMsg = ''

  // Dados do formulário de criar usuário
  criarUsuario = {
    name: '',
    email: '',
    password: '',
  };

  // Dados do formulário de logar
  logar = {
    email: '',
    password: '',
  };

  onCriarUsuario() {
    const user: Users = this.criarUsuario
    this.errorMsg = ''

    this.usersService.create(user).pipe(
      switchMap((userCriado) => {
        // Após criar o usuário, faz o login com o email e senha fornecidos
        const credenciais = {
          email: this.criarUsuario.email,
          password: this.criarUsuario.password,
        }
        return this.authService.login(credenciais) // Retorna a requisição de login
      })
    ).subscribe({
      next: (response) => {
        this.setToken(response)
        this.router.navigate(['ambiente']) // Navega para a rota 'ambiente' após o login
      },
      error: (error) => {
        if (error.status === 409) {
          this.errorMsg = error.error.message // Exibe mensagem de erro se o email já existir
        } else {
          console.error('Erro durante o processo:', error)
        }
      }
    })
  }

  // Função para o formulário de logar
  onLogar() {
    this.authService.login(this.logar).subscribe({
      next: (response) => {
        this.setToken(response)
        this.router.navigate(['ambiente']) // Navega para a rota 'ambiente' após o login
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  setToken(response: { token: string }) {
    const { token } = response
    localStorage.setItem('token', token)
    this.authStateService.setLoggedIn(true)
  }
}
