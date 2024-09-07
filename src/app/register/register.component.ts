import { Component } from '@angular/core';
import { AuthService, RegisterUser } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user?: RegisterUser;
  email = '';
  password = '';
  name = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  register() {
    this.authService.register(this.email, this.password, this.name).subscribe(
      (response: RegisterUser) => {
        this.user = response;
        console.log(this.user);
        alert('Registration successful. Your User Id: ' + this.user.userId);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      });
  }
}
