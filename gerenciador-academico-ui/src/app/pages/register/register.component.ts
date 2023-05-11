import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterDto } from 'src/app/models/auth.dto';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  register: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.register = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getRegister() {
    const registerDto: IRegisterDto = this.register.value as IRegisterDto;
    console.log(registerDto);
    this.registerService.register(registerDto).subscribe({
      next: (res) => {
        console.log(res);
        if(res.message) {
          alert(res.message);
          this.router.navigate(['/auth/login']);
        }
      },
      error: (e) => {
        if(e.error) {
          if(e.error === 'Expired Token!') {
            alert('Expired Token');
            this.authService.logout();
          }
          if(e.error.message) {
            if(e.error.message.errors) {
              let message: string = '';
              for(let msg of e.error.message.errors) {
                message += msg + '\n';
              }
              alert(message);
            }
          }
        }
        console.log(e);
      },
    });
  }

}
