import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from './currency.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CurrencyWebApp';
  amount: any;
  baseCurrency: any;
  targetCurrency: any;
  conversionRate: any;
  convertedAmount: any;
  conversionDate: any;

  constructor(private currencyService: CurrencyService) { }

  convertCurrency() {
    this.currencyService.getExchangeRate(this.baseCurrency, this.targetCurrency)
      .subscribe(data => {
        this.conversionRate = data.rates[this.targetCurrency];
        this.convertedAmount = this.amount * this.conversionRate;
        this.conversionDate = data.date;
      });
}
}
