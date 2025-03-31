import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AmbienteComponent } from './ambiente/ambiente.component'
import { AuthGuard } from '../core/guard/auth.guard'
import { UserResgisterComponent } from './user-resgister/user-resgister.component'
import { OrderComponent } from './order/order.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'ambiente',
    component: AmbienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user-resgister',
    component: UserResgisterComponent
  },
  {
    path: 'ordens',
    component: OrderComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
