import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TradeStoreService } from '../core/trade-store.service';

@Component({
  selector: 'app-trade-form',
  templateUrl: './trade-form.component.html',
  styleUrls: ['./trade-form.component.css']
})
export class TradeFormComponent {
  tradeForm: FormGroup = this.formBuilder.group({
    entryDate: ['', Validators.required],
    entryPrice: [0, [Validators.required, Validators.min(0)]],
    exitDate: ['', Validators.required],
    exitPrice: [0, [Validators.required, Validators.min(0)]],
    profit: [0, Validators.required],
  });

  exitDateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly tradeStoreService: TradeStoreService
  ) { }

  get entryDate() {
    return this.tradeForm.get('entryDate');
  }

  get entryPrice() {
    return this.tradeForm.get('entryPrice');
  }

  get exitDate() {
    return this.tradeForm.get('exitDate');
  }

  get exitPrice() {
    return this.tradeForm.get('exitPrice');
  }

  onSubmit() {
    if (this.tradeForm.invalid) {
      return;
    }

    this.tradeStoreService.add(this.tradeForm.value)
  }

  calculateProfit() {
    if (this.exitPrice !== null && this.entryPrice !== null) {
      const profit = this.exitPrice.value - this.entryPrice.value;
      this.tradeForm.setValue({ ...this.tradeForm.value, profit });
    }
  }

}
