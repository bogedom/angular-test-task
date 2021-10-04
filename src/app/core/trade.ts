export interface Trade {
  readonly entryDate: Date;
  readonly entryPrice: number;
  readonly exitDate: Date;
  readonly exitPrice: number;
  readonly profit: number;
}
