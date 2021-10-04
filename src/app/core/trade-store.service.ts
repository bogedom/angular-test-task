import { Injectable } from '@angular/core';
import { Trade } from './trade';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeStoreService {
  private readonly trades$$ = new BehaviorSubject<Trade[]>([]);

  add(trade: Trade) {
    this.trades$$.next([...this.trades$$.value, trade]);
  }

  getTrades(): Observable<Trade[]> {
    return this.trades$$.asObservable();
  }
}
