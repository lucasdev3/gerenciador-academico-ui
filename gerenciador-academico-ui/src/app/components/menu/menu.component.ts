import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  isAuthenticated: boolean = false;
  currentRoute: string;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.currentRoute = this.router.url;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
