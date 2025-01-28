import {Component, OnInit} from '@angular/core';
import {CryptoService} from "../../../../core/services/crypto.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent  implements OnInit {
  currencies: { id: string, name: string; symbol: string, sign: string | null }[] = [];
  selectedId: string | null = null;
  amount: number = 1;
  convertTo: string | null = 'USD';
  convertedCurrencySign: string | null = null;
  convertedPrice: number | null = null;
  selectedCurrencySymbol: string | null = '';
  selectedCurrencySign: string | null = null;
  selectedCurrencyPrice: number | null = null;
  reverseCurrencyPrice: number | null = null;

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
    this.cryptoService.getAllCurrencies().subscribe((data) => {
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
      this.cryptoService.priceConversion(this.amount, this.selectedId, null, this.convertTo).subscribe({
        next: (price) => {
          this.convertedPrice = price;
          this.selectedCurrencyPrice = this.convertedPrice / this.amount;
          this.reverseCurrencyPrice = 1 / this.selectedCurrencyPrice;
        },
        error: (err) => console.error(err.message),
      });
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
    this.convertedPrice = null;
    this.convertTo = 'USD';
  }

  swapCurrencies(): void {
    this.selectedId = this.currencies.find((crypto) => crypto.symbol === this.convertTo)?.id || null;
    this.convertTo = this.selectedCurrencySymbol;
  }
}
