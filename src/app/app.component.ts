import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CurrencyService } from '../currency.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapDatepickerDirective } from '../../bootstrap-datepicker.directive';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,FormsModule, NgbModule],
  providers:[CurrencyService,BootstrapDatepickerDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  amount: any;
  baseCurrency: any;
  targetCurrency: any;
  conversionRate: any;
  convertedAmount: any;
  conversionDate = "";
  convertedDate = "";
  isConverted = false;
  noConversion = false;
  //supported  foreign currencies type
  currencyTypes = ["USD", "EUR", "JPY", "GBP", "AUD", "CHF", "CNY", "HKD", "MXN", "INR","CAD"];                   

  constructor(private currencyService: CurrencyService) { }
 convertCurrency() {
    if (this.baseCurrency === 'CAD' || this.targetCurrency === 'CAD') {
      // executing Api
      this.currencyService.getExchangeRate(this.baseCurrency, this.targetCurrency, this.conversionDate).subscribe(
        (data) => {                                                                                                
          this.noConversion = data.observations.length === 0;
           //Fetching value using dynamic key property of JSON
          this.conversionRate = data.observations[0][this.conversionFormat(this.baseCurrency, this.targetCurrency)].v;              
          this.convertedAmount = this.amount * this.conversionRate;
          this.convertedDate = data.observations[0].d;
          this.isConverted = true;
          this.clearData();
        },
        () => {
          alert('Error during conversion. Please try again.');
          this.clearData();
        }
      );
    } else {
      this.isConverted = false;
      alert('Please choose either base currency or target currency as CAD');
      this.clearData();
    }
  }

  conversionFormat(baseCurrency: string, targetCurrency: string) {  
    //Creating dynamic key property of JSON                                        
    return 'FX' + baseCurrency + targetCurrency;     
  }

  resetValue() {
    // Hiding result div for drop down selection and amount change
    this.isConverted = false;                 
  }
  clearData ()
  {
     //Resetting form value after submission
    this.amount = null;
    this.baseCurrency = null;                
    this.targetCurrency = null;
    this.conversionDate = "";
  }
}
