import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { PagesRoutingModule } from './pages-routing.module'
import { LoginComponent } from './login/login.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AmbienteComponent } from './ambiente/ambiente.component'

@NgModule({
  declarations: [
    LoginComponent,
    AmbienteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [LoginComponent, AmbienteComponent]
})
export class PagesModule { }
