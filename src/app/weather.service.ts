import { Injectable } from '@angular/core';
import { Weather } from './Models/weather.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    weatherList: Weather[] = [];
    url: string = "https://localhost:7152";

    constructor(private http: HttpClient) { }

    getWeather(city: string, startDate: string): Observable<Weather[]> {
        return this.http.get<Weather[]>(this.url.concat("/WeatherForecast/GetWeatherForecast/").concat(city).concat("/").concat(startDate));
    }

    getAllWeather(): Weather[] {
        return this.weatherList;
    }

    getCity(city:string): Observable<string[]>{
        return this.http.get<string[]>(`${this.url}/WeatherForecast/getCities/${city}`)
    }
}
