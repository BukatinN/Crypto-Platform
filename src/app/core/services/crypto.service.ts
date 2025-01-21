import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Cryptocurrency, ApiCryptocurrency} from "../models/cryptocurrency.model";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly API_URL: string = "/api";
  private readonly API_KEY: string = "e83e15db-0830-424e-822a-eb064a55e787";

  constructor( private http: HttpClient) {}

  getCryptoCurrencies(): Observable<Cryptocurrency[]> {
    return this.http.get<{ data: ApiCryptocurrency[] }>(`/api/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': this.API_KEY,
        'Access-Control-Allow-Origin': '*',
      },
      params: {limit: '50', convert: 'USD'},
    })
      .pipe(
        map(response => response.data.map(
          (item: ApiCryptocurrency) => ({
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            price: +item.quote.USD.price.toFixed(3),
            marketCap: item.quote.USD.market_cap,
            supply: item.circulating_supply,
            priceHistory: [],
          }),
        )),
        catchError((error: HttpErrorResponse) => {
          console.error('Ошибка при загрузке данных:', error);
          return throwError(() => new Error('Не удалось загрузить данные. Пожалуйста, проверьте соединение.'));
        }),
      );
  }

  getPriceHistory(basePrice: number): number[] {
    const history: number[] = [];
    let price = basePrice;
    for (let i = 0; i < 50; i++) {
      const randomFactor  = Math.random() * 5 - 2.5;
      price += (price * randomFactor ) / 100;
      history.push(+price.toFixed(3));
    }
    return history;
  }
}
