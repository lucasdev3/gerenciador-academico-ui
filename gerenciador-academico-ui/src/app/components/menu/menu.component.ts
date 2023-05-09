import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  // export class MenuComponent implements OnInit, OnChanges {
  currentRoute: string;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.verifyAuthentication();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  verifyAuthentication(): void {
    if (!this.authService.isAuthenticated) {
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
