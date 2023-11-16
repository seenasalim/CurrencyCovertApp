import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  //fetching api from environment class
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
    getExchangeRate(baseCurrency: string, targetCurrency: string, date?: string): Observable<any> {
      //calling asp.net API
    const apiUrl = `${this.baseUrl}/?fromCurrency=${baseCurrency}&toCurrency=${targetCurrency}&date=${date == "" ? "" : date}`
    return this.http.get(apiUrl);
  }
}