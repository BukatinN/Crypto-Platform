import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Cryptocurrency, ApiCryptocurrency} from "../interfaces/cryptocurrency.interface";
import {catchError, combineLatest, filter, forkJoin, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly API_URL: string = "/api";
  private readonly API_KEY: string = "e83e15db-0830-424e-822a-eb064a55e787";

  constructor( private http: HttpClient) {}

  getCryptoCurrencies(): Observable<Cryptocurrency[]> {
    return this.http.get<{ data: ApiCryptocurrency[] }>(`${this.API_URL}/v1/cryptocurrency/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': this.API_KEY,
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
      const randomFactor  = Math.random() * 5 - 2.5; //сложные вычисления
      price += (price * randomFactor ) / 100;
      history.push(+price.toFixed(3));
    }
    return history;
  }

  priceConversion(amount: number, id: string | null, symbol: string | null, convert: string): Observable<number> {
    const params: { [key: string]: string | number } = {
      amount,
      convert,
    };

    switch (true) {
      case !!id:
        params['id'] = id;
        break;
      case !!symbol:
        params['symbol'] = symbol;
        break;
      default:
        throw new Error('Необходимо указать либо id, либо symbol.');
    }

    return this.http.get<{
      data: { quote: { [key: string]: { price: number } } }
    }>(`${this.API_URL}/v2/tools/price-conversion`, {
      headers: {
        'X-CMC_PRO_API_KEY': this.API_KEY,
      },
      params,
    })
      .pipe(
        filter(response => !!response.data.quote[convert]),
        map(response => response.data.quote[convert].price),
        catchError((error: HttpErrorResponse) => {
          console.error('Ошибка при конвертации цены:', error);
          return throwError(() => new Error('Не удалось выполнить конвертацию. Пожалуйста, проверьте соединение.'));
        }),
      );
  }

  getAllCurrencies(): Observable<{ id: string; symbol: string; name: string; sign: string | null }[]> {
    const fiatUrl = `${this.API_URL}/v1/fiat/map`;
    const cryptoUrl = `${this.API_URL}/v1/cryptocurrency/map`;

    const headers = {
      'X-CMC_PRO_API_KEY': this.API_KEY,
    };

    return combineLatest([
      this.http.get<{ data: any[] }>(fiatUrl, {
        headers,
        params: {
          sort: 'id',
        },
      }),
      this.http.get<{ data: any[] }>(cryptoUrl, {
        headers,
        params: {
          limit: '200',
        },
      }),
    ]).pipe(
      map(([fiatResponse, cryptoResponse]) => {
        const fiatCurrencies = fiatResponse.data.map((fiat) => ({
          id: fiat.id,
          symbol: fiat.symbol,
          name: fiat.name,
          sign: fiat.sign,
        }));

        const cryptoCurrencies = cryptoResponse.data.map((crypto) => ({
          id: crypto.id,
          symbol: crypto.symbol,
          name: crypto.name,
          sign: null,
        }));

        return [...fiatCurrencies, ...cryptoCurrencies];
      }),
    );
  }
}
