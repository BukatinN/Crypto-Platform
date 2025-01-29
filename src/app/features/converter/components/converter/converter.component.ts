import {Component, OnDestroy, OnInit} from '@angular/core';
import {CryptoService} from "../../../../core/services/crypto.service";
import {catchError, Observable, of, Subject, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent  implements OnInit, OnDestroy {
  convertedPrice$: Observable<number | null> = of(null);
  currencies: { id: string, name: string; symbol: string, sign: string | null }[] = [];
  selectedId: string | null = null;
  amount: number = 1;
  convertTo: string | null = 'USD';
  convertedCurrencySign: string | null = null;
  selectedCurrencySymbol: string | null = '';
  selectedCurrencySign: string | null = null;
  selectedCurrencyPrice: number | null = null;
  reverseCurrencyPrice: number | null = null;
  destroy$: Subject<void> = new Subject<void>();

  refreshButtonOptions = {
    icon: 'refresh',
    text: 'Refresh',
    stylingMode: 'text',
    onClick: () => this.refreshConverter(),
  };
  resetButtonOptions = {
    icon: 'clear',
    text: 'Reset',
    stylingMode: 'text',
    onClick: () => this.resetConverter(),
  };

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.getAllCurrencies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
      this.currencies = data;
    });
  }

  onParameterChange(): void {
    const selectedCurrency = this.currencies.find((crypto) => crypto.id === this.selectedId);
    this.selectedCurrencySymbol = selectedCurrency?.symbol || null;
    this.selectedCurrencySign = selectedCurrency?.sign || null;

    const convertedCurrency = this.currencies.find((crypto) => crypto.symbol === this.convertTo);
    this.convertedCurrencySign = convertedCurrency?.sign || null;

    if (this.selectedId && this.amount && this.convertTo) {
      this.convert();
    }
  }

  convert() {
    if (this.selectedId && this.amount > 0 && this.convertTo) {
      this.convertedPrice$ = this.cryptoService
        .priceConversion(this.amount, this.selectedId, null, this.convertTo)
        .pipe(
          tap((price) => {
            this.selectedCurrencyPrice = price / this.amount;
            this.reverseCurrencyPrice = 1 / this.selectedCurrencyPrice;
          }),
          catchError((err) => {
            console.error(err.message);
            return of(null);
          }),
          takeUntil(this.destroy$)
        );
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  }

  onSymbolChange(event: any): void {
    this.selectedId = event.value;
    this.onParameterChange();
  }

  refreshConverter(): void {
    this.onParameterChange();
  }

  resetConverter(): void {
    this.amount = 1;
    this.selectedId = null;
    this.selectedCurrencySymbol = null;
    this.selectedCurrencySign = null;
    this.selectedCurrencyPrice = null;
    this.reverseCurrencyPrice = null;
    this.convertedPrice$ = of(null);
    this.convertTo = 'USD';
  }

  swapCurrencies(): void {
    this.selectedId = this.currencies.find((crypto) => crypto.symbol === this.convertTo)?.id || null;
    this.convertTo = this.selectedCurrencySymbol;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
