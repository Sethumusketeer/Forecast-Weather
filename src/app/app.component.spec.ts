import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service'; 

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceMock = {
      loggedIn: new BehaviorSubject<boolean>(false),
      logout: jasmine.createSpy('logout')
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show navigation bar when user is loggedIn', () => {
    authService.loggedIn.next(true);
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar).toBeTruthy();
  });

  it('should not show navigation bar when user is not logged in', () => {
    authService.loggedIn.next(false);
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar).toBeFalsy();
  });

  it('should log out the user when logout button is clicked', () => {
    authService.loggedIn.next(true);
    fixture.detectChanges();

    const logoutButton = fixture.debugElement.query(By.css('.btn-danger'));
    logoutButton.triggerEventHandler('click', null);

    expect(authService.logout).toHaveBeenCalled();
  });

});