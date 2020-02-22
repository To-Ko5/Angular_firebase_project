import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';
  user$ = this.authService.afUser$;

  constructor(
    private authService: AuthService
  ){

  }
  logout() {
    this.authService.logout();
  }
}
