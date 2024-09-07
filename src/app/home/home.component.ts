import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  newLocation = '';
  userLocation = 'Chennai'
  userWeather?: any;
  currentDate?: string;
  userData = this.authService.getUser();
  imageUrl = 'https://wallpaperaccess.com/full/1540052.jpg'
  
  constructor(private http: HttpClient, public authService: AuthService, public weatherService: WeatherService) {
    this.currentDate = this.getCurrentDate();
   }

  ngOnInit(): void {
    this.fetchWeather(this.userLocation);
  }

  fetchWeather(location: string) {
    this.weatherService.getWeather(location, this.currentDate ?? "default").subscribe(
      (response: any[]) => {
        const weatherForCurrentDate = response.filter(item => item.date === this.currentDate);
        if (weatherForCurrentDate && weatherForCurrentDate.length > 0) {
          this.userWeather = weatherForCurrentDate[0];
          console.log(this.userWeather);
        }
        else {
          console.log('No weather data available for current date');
        }
      },
      (error) => {
        console.error('Error receiving weather data', error);
      }
    );
  }

  getCurrentDate(): string | string{
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }
}