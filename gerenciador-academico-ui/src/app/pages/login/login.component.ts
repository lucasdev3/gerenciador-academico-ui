import { Component } from '@angular/core';

import { ILoginDto } from 'src/app/models/auth.dto';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'; 
import { ITokenDto } from 'src/app/models/token.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getLogin() {
    const loginDto: ILoginDto = this.login.value as ILoginDto;
    this.loginService.login(loginDto).subscribe({
      next: (res: ITokenDto) => {
        if (res.token) {
          alert('Login realizado com sucesso!');
          this.authService.login(res.token, res.authorities[0].authority);
          this.router.navigate(['/dashboard/alunos']);
        }
      },
      error: (e) => {
        if(e.error) {
          if(e.error === 'Expired Token!') {
            alert('Expired Token');
            this.authService.logout();
            return;
          }
          alert(e.error.message);
          loginDto.password = '';
          this.login.setValue({
            username: '',
            password: ''
          });
        }
      },
    });
  }
}
