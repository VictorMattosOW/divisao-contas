import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { FinalOrder, OrderPerUser } from 'src/app/shared/models/order.model'
import { User } from 'src/app/shared/models/user.model'
import { OrderService } from 'src/app/shared/services/order.service'
import { SessionService } from 'src/app/shared/services/session.service'

@Component({
  selector: 'app-order-division',
  templateUrl: './order-division.component.html',
  styleUrls: ['./order-division.component.css']
})
export class OrderDivisionComponent implements OnInit {

  usersList: User[]
  finalOrder: FinalOrder
  orderPerUser: OrderPerUser[]
  cardState: boolean[] = [];
  finalValue: number
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getFinalOrder()
  }


  getFinalOrder() {
    this.sessionService.getFinalOrderObservable().subscribe({
      next: (finalOrder: FinalOrder) => {
        this.finalOrder = finalOrder
        this.isOrderEmpty()
        this.calculateOrders()
      },
    })
  }

  isOrderEmpty() {
    if (this.finalOrder.tax == null) {
      this.router.navigate(['pessoas'])
    }
  }

  getUsers() {
    this.sessionService.getUsersObservable().subscribe({
      next: (users) => {
        if (users.length === 0) {
          this.router.navigate(['registrar'])
        }
        this.usersList = users
      },
    })
  }

  openCard(index: number) {
    this.cardState[index] = this.cardState[index] ? false : true
  }

  calculateOrders() {
    const { orders, tax } = this.finalOrder
    this.orderPerUser = this.orderService.calculateConsumption(this.usersList, orders, tax)
    this.finalValue = this.orderService.sumTotalOrders(this.finalOrder.orders, this.finalOrder.tax)
  }

  goToSummary() {
    this.router.navigate(['resumo'])
  }

  goToStart() {
    this.router.navigate(['inicio'])
  }
}
