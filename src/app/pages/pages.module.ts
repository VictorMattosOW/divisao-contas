import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { PagesRoutingModule } from './pages-routing.module'
import { LoginComponent } from './login/login.component'
import { HttpClientModule } from '@angular/common/http'
import { UserResgisterComponent } from './user-resgister/user-resgister.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { ButtonLinkComponent } from '../shared/components/button-link/button-link.component'
import { TooltipComponent } from '../shared/components/tooltip/tooltip.component'
import { AutofocusDirective } from '../shared/diretivas/autofocus.directive'
import { OrderComponent } from './order/order.component'
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency'
import { SummaryComponent } from './summary/summary.component'
import { OrderDivisionComponent } from './order-division/order-division.component'
import { CurrencyPipe } from '../shared/pipes/currency.pipe'

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
}

@NgModule({
  declarations: [
    LoginComponent,
    UserResgisterComponent,
    ButtonComponent,
    ButtonLinkComponent,
    TooltipComponent,
    AutofocusDirective,
    UserResgisterComponent,
    OrderComponent,
    SummaryComponent,
    OrderDivisionComponent,
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [LoginComponent, ButtonLinkComponent, ButtonComponent, TooltipComponent, UserResgisterComponent, OrderComponent, SummaryComponent, OrderDivisionComponent]
})
export class PagesModule { }
