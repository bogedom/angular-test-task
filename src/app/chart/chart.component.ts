import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradeStoreService } from '../core/trade-store.service';
import { map, takeUntil } from 'rxjs/operators';
import { BalanceService } from '../core/balance.service';
import { Subject } from 'rxjs';
import { Trade } from '../core/trade';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  private readonly destroy$$ = new Subject();

  results: any[] = [];

  view: [number, number] = [700, 300];
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Balance';

  constructor(
    private readonly tradeStoreService: TradeStoreService,
    private readonly balanceService: BalanceService
  ) { }

  ngOnInit(): void {
    this.tradeStoreService.getTrades().pipe(
      map(trades => this.convertToSeries(trades)),
      takeUntil(this.destroy$$)
    ).subscribe((data) => {
      this.results = [{
        name: 'Balance',
        series: data
      }];
    })
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  private convertToSeries(trades: Trade[]) {
    const sortedTrades = trades.sort((a, b) => {
      return a.exitDate.getTime() - b.exitDate.getTime();
    });
    const balance = this.balanceService.getBalance(sortedTrades);

    return Array.from(balance, ([name, value]) => ({ name, value }));
  }
}
