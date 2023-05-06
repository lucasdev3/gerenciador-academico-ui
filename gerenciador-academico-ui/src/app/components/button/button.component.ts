import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {

  // goToAlunos: boolean = false;
  @Input() goToAlunos: boolean = false;

  constructor(private router: Router) {}

  navigate(endpoint: string) {
    this.router.navigate([endpoint]);
  }
  
}
