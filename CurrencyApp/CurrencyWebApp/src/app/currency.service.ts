import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private baseUrl = 'https://localhost:32770/CurrencyConvert';
  constructor(private http: HttpClient) { }
  getExchangeRate(baseCurrency: string, targetCurrency: string, date?: string): Observable<any> {
    const apiUrl = `${this.baseUrl}/${date}?fromCurrency=${baseCurrency}&toCurrency=${targetCurrency}`

    return this.http.get(apiUrl);
  }
}
