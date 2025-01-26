import {Component, OnInit} from '@angular/core';
import {CryptoService} from "../../../../core/services/crypto.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss',
})
export class ConverterComponent  implements OnInit {
  cryptocurrencies: { id: string, name: string; symbol: string }[] = [];
  selectedId: string | null = null;
  amount: number = 1;
  convertTo: string = 'USD';
  convertedPrice: number | null = null;

  constructor(private cryptoService: CryptoService) {}

  ngOnInit() {
    this.cryptoService.getCryptoCurrencies().subscribe({
      next: (data) => {
        this.cryptocurrencies = data.map((crypto) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
        }));
      },
      error: (err) => console.error(err.message),
    });
  }

  convert() {
    if (this.selectedId && this.amount > 0 && this.convertTo) {
      this.cryptoService.priceConversion(this.amount, this.selectedId, null, this.convertTo).subscribe({
        next: (price) => {
          this.convertedPrice = price;
        },
        error: (err) => console.error(err.message),
      });
    } else {
      alert('Пожалуйста, заполните все поля.');
    }
  }

  onSymbolChange(event: any): void {
    this.selectedId = event.value;
  }
}
