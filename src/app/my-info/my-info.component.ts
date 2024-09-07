import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService, RegisterUser } from '../auth.service';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent {
  userData = this.authService.getUser();
  imageUrl = 'https://media.istockphoto.com/id/1144975137/photo/white-screen-led-tv-television-isolated-on-white-background.webp?b=1&s=170667a&w=0&k=20&c=TvKP4QykAHHgDKHzHR2Hu-GY_mvizzzn0nwoa0nJW54='
  changePasswordButtonClicked = false;
  oldPassword = '';
  newPassword = '';
  updateMode = false;
  
  constructor(private http: HttpClient, public authService: AuthService, public weatherService: WeatherService) { }

  changePassword() {
    if (this.oldPassword !== '' && this.newPassword !== '') {
      this.authService.updatePassword(this.userData.email, this.newPassword, this.userData.name).subscribe(
        (response: RegisterUser) => {
          this.authService.setUser(response);
        },
        (error) => {
          console.log(error);
        });
      console.log('Old password: ' + this.oldPassword);
      console.log('New password: ' + this.newPassword);
      this.changePasswordButtonClicked = false;
    }
  }

  toggleUpdateMode() {
    if(this.updateMode == true){
       this.updateUserData();
    }
    this.updateMode = !this.updateMode;
  }

  updateUserData() {
    this.authService.updateUserDetails(this.userData.email, this.newPassword, this.userData.name).subscribe(
      (response: RegisterUser) => {
        this.authService.setUser(response);
      },
      (error) => {
        console.log(error);
      });
  }
}
