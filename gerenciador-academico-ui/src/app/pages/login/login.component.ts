import { Component } from '@angular/core';

import { ILoginDto } from 'src/app/models/login.dto';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { ITokenDto } from 'src/app/models/token.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: FormGroup;
  // localStorageService: LocalStorageService;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
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
          this.tokenService.saveData('token', res.token);
          this.router.navigate(['/dashboard/alunos']);
        }
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}
