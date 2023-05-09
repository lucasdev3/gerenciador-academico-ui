import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alunos-atualizacao',
  templateUrl: './alunos-atualizacao.component.html',
  styleUrls: ['./alunos-atualizacao.component.css'],
})
export class AlunosAtualizacaoComponent implements OnInit, OnChanges {
  expectedRoutes: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.verifyAuthentication();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.verifyAuthentication();
  }

  verifyAuthentication() {
    this.expectedRoutes = this.activatedRoute.snapshot.data;
    if (!this.authService.hasRequiredRoles(this.expectedRoutes.expectedRoles)) {
      this.authService.logout();
    }
  }
}
