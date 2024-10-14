import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule], // Додаємо FormsModule до imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'trustyconvert';
  exchangeRates: any = {}; // Зберігає курси валют
  availableCurrencies: string[] = []; // Доступні валюти
  amount: number = 0.0; // Введена сума
  fromSelectedCurrency: string = 'UAH'; // Вибрана валюта
  toSelectedCurrency: string = 'USD'; // Вибрана валюта
  swapBuff: string = ''; // Буферна змінна для зміни валют місцями

  conversionResult: number = 0.0; // Результат конвертації

  // Посилання на API
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Отримання курсів валют під час ініціалізації компонента
    this.http.get<any>(this.apiUrl).subscribe((data) => {
      this.exchangeRates = data.rates;
      // Зберігаємо доступні валюти в масив
      this.availableCurrencies = Object.keys(this.exchangeRates);
    });
  }

  // Метод для конвертації
  convertCurrency() {
    if (this.exchangeRates[this.fromSelectedCurrency]) {
      this.conversionResult =
        (this.amount / this.exchangeRates[this.fromSelectedCurrency]) *
        this.exchangeRates[this.toSelectedCurrency];
      this.conversionResult = parseFloat(this.conversionResult.toFixed(2));
    }
  }

  // Змінює місцями валюти
  swap() {
    this.swapBuff = this.toSelectedCurrency;
    this.toSelectedCurrency = this.fromSelectedCurrency;
    this.fromSelectedCurrency = this.swapBuff;
    this.convertCurrency();
  }
}
