import { Injectable } from '@angular/core';
import { Trade } from './trade';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  getBalance(trades: Trade[]) {
    return trades.reduce((balance, trade) => {
      const date = `${this.monthNames[trade.exitDate.getMonth()]} ${trade.exitDate.getDate()}`

      let profit = balance.get(date) || 0;

      profit += trade.profit

      balance.set(date, profit);

      return balance;
    }, new Map<string, number>());
  }
}
