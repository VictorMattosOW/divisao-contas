import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from '../core/guard/auth.guard'
import { UserResgisterComponent } from './user-resgister/user-resgister.component'
import { OrderComponent } from './order/order.component'
import { SummaryComponent } from './summary/summary.component'
import { OrderDivisionComponent } from './order-division/order-division.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pessoas',
    component: UserResgisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordens',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordens/:id',
    component: OrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resumo',
    component: SummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'divisao-pedido',
    component: OrderDivisionComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
