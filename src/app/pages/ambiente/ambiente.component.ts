import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth-services.service'
import { AuthStateService } from 'src/app/services/auth-state.service'

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css']
})
export class AmbienteComponent implements OnInit {

  constructor(
    private authStateService: AuthStateService,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    const token = this.authService.getToken()
    if (token) this.authStateService.setLoggedIn(true)
  }

}
