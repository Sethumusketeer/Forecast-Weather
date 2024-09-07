import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'forecast-weather';

  constructor(public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.loggedIn.next(false);
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
