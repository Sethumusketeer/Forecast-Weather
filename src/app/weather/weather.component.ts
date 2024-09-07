import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})

export class WeatherComponent implements OnInit {
  cityName = '';
  startDate: string = "";
  filteredWeatherData: any[] = [];
  selectedDate: string = '';
  selectedWeatherInfo: any;
  activeTab = 0;
  imageUrl = 'https://th.bing.com/th/id/R.6bbe03db6537b1829591ac96e92ce319?rik=gu3iejXcEHAOTg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f8%2f1%2fa%2f566440.jpg&ehk=qh4yoewO28RS38nNt2ZO5EmgdtJc1hKV1gYfXNFPrkE%3d&risl=&pid=ImgRaw&r=0';
  similarCities: any[] = [];
  private cityNameSubject: Subject<string> = new Subject();

  constructor(private weatherService: WeatherService,
              private router: Router) { }

  ngOnInit(): void {
    this.startDate = new Date().toISOString().split('T')[0];
    this.filteredWeatherData = [];
    this.cityNameSubject.pipe(
      filter(cityName => cityName !== ''),
      debounceTime(300)
    ).subscribe(cityName => this.loadCityOptions(cityName));
  }

  loadCityOptions(cityName: string): void {
    this.weatherService.getCity(cityName).subscribe(similarCities => {
      this.similarCities = similarCities;
    });
  }

  onCityNameChange(): void {
    if (this.cityName != '') {
      this.cityNameSubject.next(this.cityName);
    }
  }
  
  selectCity(city: string): void {
    this.cityName = city;
    this.similarCities = [];
    this.showWeather();
  }

  showWeather(): void {
    if (!this.cityName || !this.startDate) {
      console.log('City Name or Start date is missing');
      return;
    }
  
    this.weatherService.getWeather(this.cityName, this.startDate).subscribe(weather => {
      this.updateWeatherData(weather);
    }, error => {
      console.error(error);
    });
  }

  private updateWeatherData(weather: any[]): void {
    this.filteredWeatherData = this.filterWeatherData(weather);

    if (this.filteredWeatherData.length > 0) {
      this.selectedDate = this.filteredWeatherData[0].date;
      this.selectedWeatherInfo = this.filteredWeatherData[0];
    }
  }

  private filterWeatherData(weatherData: any[]): any[] {
    const currentDate = new Date(this.startDate);

    return weatherData.filter(({ date }, index) =>
      index < 5 && new Date(date) >= currentDate
    );
  }

  setActiveTab(index: number): void {
    this.activeTab = index;
  }
}