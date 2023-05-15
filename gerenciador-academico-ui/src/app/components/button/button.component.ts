import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() classBtn: string = '';
  @Input() textBtn: string = '';
  @Input() typeBtn: string = '';
  @Input() routerLink: string = '';  
}
