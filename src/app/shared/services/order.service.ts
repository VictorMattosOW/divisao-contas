import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { Order, OrderPerUser } from '../models/order.model'

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor() { }

  calculateConsumption(
    users: User[],
    orders: Order[],
    tax: number
  ): OrderPerUser[] {
    if (users && orders) {
      const consumptionMap: { [key: string]: OrderPerUser } = {}
      users.forEach((user) => {
        consumptionMap[user.id] = {
          name: user.name,
          totalValue: 0,
          orders: [],
        }
      })

      orders.forEach((order) => {
        const { price, quantity, sharedUsers } = order
        const totalValueWithTax = price * quantity * (1 + tax / 100)

        // Calcula o valor por pessoa com maior precisão
        const valuePerUser = totalValueWithTax / sharedUsers.length

        // Arredonda para 2 casas decimais
        const roundedValue = Math.round(valuePerUser * 100) / 100

        // Calcula a diferença devido ao arredondamento
        let remainder = parseFloat((totalValueWithTax - (roundedValue * sharedUsers.length)).toFixed(2))

        sharedUsers.forEach((user, index) => {
          let userValue = roundedValue

          // Distribui o remainder de forma equilibrada
          if (remainder !== 0) {
            const adjustment = remainder > 0 ? 0.01 : -0.01
            userValue += adjustment
            remainder = parseFloat((remainder - adjustment).toFixed(2))
          }

          consumptionMap[user.id].totalValue += userValue
          consumptionMap[user.id].orders.push({
            food: order.name,
            sharedValue: userValue,
          })
        })
      })

      // Arredonda os totais finais para evitar erros de decimal
      const result: OrderPerUser[] = Object.values(consumptionMap).map(user => ({
        ...user,
        totalValue: parseFloat(user.totalValue.toFixed(2))
      }))

      return result
    }
    return null
  }

  calcularValorFinal(valorInicial: number, porcentagem: number): number {
    const valorFinal = valorInicial + (valorInicial * porcentagem) / 100
    return valorFinal
  }

  multiplyValues(quantity: number, price: number): number {
    return quantity * price
  }

  sumTotalOrders(orders: Order[] = [], percent: number = 1): number {
    // const percent = (this.orderForm.value.percent < 1) ? 1 : this.orderForm.value.percent;
    const totalOrders = orders.reduce((sum, order) => {
      return (
        sum +
        this.calcularValorFinal(
          this.multiplyValues(order.quantity, order.price),
          percent
        )
      )
    }, 0)
    return totalOrders
  }
}
