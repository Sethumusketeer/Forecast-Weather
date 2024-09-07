import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface RegisterUser {
  name: string;
  userId: number;
  email: string;
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: RegisterUser = {
    name: "",
    userId: 0,
    email: "",
    password: ""
};
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  register(email: string, password: string, name: string): Observable<RegisterUser> {
    const body = { "name": name, "email": email, "password": password };
    return this.http.post<RegisterUser>('https://localhost:7152/api/Register/register', body);
  }

  login(userId: number, password: string): Observable<RegisterUser> {
    const body = { userId: userId, password: password };
    const result = this.http.post<RegisterUser>('https://localhost:7152/api/Login/login', body);
    result.subscribe(
      (response: RegisterUser) => {
        this.user = response;
        if (response.email != '') {
          this.loggedIn.next(true);
        }
      });
    return result;
  }

  updatePassword(email: string, password: string, name: string): Observable<RegisterUser> {
    const body = { "name": name, "email": email, "password": password };
    return this.http.put<RegisterUser>('https://localhost:7152/api/Register/updatePassword', body);
  }

  updateUserDetails(email: string, password: string, name: string): Observable<RegisterUser> {
    const body = { "name": name, "email": email, "password": password };
    return this.http.put<RegisterUser>('https://localhost:7152/api/Register/updateUserDetails', body);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  setUser(userData: RegisterUser): void {
    this.user = userData;
    console.log(this.user.email);
  }

  getUser(): RegisterUser  {
    return this.user;
  }

  checklogging() {
    this.login
  }
}