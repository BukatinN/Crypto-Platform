import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Transaction} from "../interfaces/transaction.interface";
import {UserToken} from "../interfaces/users.interface";

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private apiUrl: string = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getUserTokens(): Observable<UserToken[]> {
    return this.http.get<UserToken[]>(`${this.apiUrl}/userTokens`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  saveTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  buyToken(tokenId: number, amount: number, price: number): Observable<Transaction> {
    const transaction: Transaction = {
      id: Date.now(),
      tokenId,
      type: 'buy',
      amount,
      price,
      date: new Date().toISOString(),
    };

    this.http.get<UserToken>(`${this.apiUrl}/tokens/${tokenId}`).subscribe((token) => {
      const updatedToken = {
        ...token,
        amount: token.amount + amount,
      };
      this.http.put(`${this.apiUrl}/tokens/${tokenId}`, updatedToken).subscribe();
    });

    // Добавляем транзакцию
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

  sellToken(tokenId: number, amount: number, price: number): Observable<Transaction> {
    const transaction: Transaction = {
      id: Date.now(),
      tokenId,
      type: 'sell',
      amount,
      price,
      date: new Date().toISOString(),
    };

    this.http.get<UserToken>(`${this.apiUrl}/tokens/${tokenId}`).subscribe((token) => {
      const updatedToken = {
        ...token,
        amount: token.amount - amount,
      };
      this.http.put(`${this.apiUrl}/tokens/${tokenId}`, updatedToken).subscribe();
    });

    // Добавляем транзакцию
    return this.http.post<Transaction>(`${this.apiUrl}/transactions`, transaction);
  }

}
