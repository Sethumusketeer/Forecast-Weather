import { Component } from '@angular/core';
import { AuthService, RegisterUser } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: RegisterUser = {
    name: "",
    userId: 0,
    email: "",
    password: ""
};
  userId = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(parseInt(this.userId), this.password).subscribe(
      (response: RegisterUser) => {
        this.user = response;
        if (response.email != '') {
          this.authService.setUser(response);
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        alert('Login Failed, Invalid User Id or Password')
        console.log(error);
      }
    );
  }
}
