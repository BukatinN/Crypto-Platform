import {Component, OnInit} from '@angular/core';
import {CryptoService} from "../../../../core/services/crypto.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent  implements OnInit {
  currencies: { id: string, name: string; symbol: string }[] = [];
  selectedId: string | null = null;
  amount: number = 1;
  convertTo: string = 'USD';
  convertedPrice: number | null = null;
  selectedCurrencySymbol: string | null = '';
  selectedCurrencyPrice: number | null = null;
  reverseCurrencyPrice: number | null = null;

  refreshButtonOptions = {
    icon: 'refresh',
    text: 'Refresh',
    onClick: () => this.refreshConverter(),
  };
  resetButtonOptions = {
    icon: 'clear',
    text: 'Reset',
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
    this.selectedCurrencySymbol = selectedCurrency?.symbol || '';

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
    console.log('Refresh clicked');
  }

  resetConverter(): void {
    this.amount = 1;
    this.selectedId = null;
    this.selectedCurrencySymbol = null;
    this.selectedCurrencyPrice = null;
    this.reverseCurrencyPrice = null;
    this.convertedPrice = null;
    this.convertTo = 'USD';
  }
}
