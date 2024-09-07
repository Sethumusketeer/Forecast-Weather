import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../auth.service';
import { WeatherService } from '../weather.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const authServiceStub = {
    getUser: () => ({ name: 'John Doe' })
  };

  const weatherServiceStub = {
    getWeather: jasmine.createSpy('getWeather').and.returnValue(of([
      {
        date: '2024-06-19', 
        location: 'Chennai', 
        description: 'Sunny',
        temperature: '20', 
        temperatureF: '68',
        humidity: '30', 
        windSpeed: '5', 
        forecast: 'Sunny'
       }
    ]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: WeatherService, useValue: weatherServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch weather data on init', () => {
    component.ngOnInit();
    expect(weatherServiceStub.getWeather).toHaveBeenCalledWith('Chennai', component.currentDate);
    expect(component.userWeather).toBeDefined();
    expect(component.userWeather.location).toEqual('Chennai');
  });

  it('should display user name and weather data', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.welcome').textContent).toContain('John Doe');
    expect(compiled.querySelector('.location').textContent).toContain('Chennai');
    expect(compiled.querySelector('.description').textContent).toContain('Sunny');
    expect(compiled.querySelector('.temperature').textContent).toContain('20');
  });
});