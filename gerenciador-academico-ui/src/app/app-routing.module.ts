import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlunosComponent } from './pages/dashboard/alunos/alunos.component';
import { AlunosCadastroComponent } from './pages/dashboard/alunos-cadastro/alunos-cadastro.component';
import { AlunosAtualizacaoComponent } from './pages/dashboard/alunos-atualizacao/alunos-atualizacao.component';
import { AuthGuard } from './services/guard/auth-guard.service';
import { enviroment } from './enviroments/enviroments';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alunos',
        component: AlunosComponent,
        data: {
          expectedRoles: [enviroment.roleProfessor, enviroment.roleAdmin],
        },
      },
      {
        path: 'alunos/cadastro',
        component: AlunosCadastroComponent,
        data: {
          expectedRoles: [enviroment.roleProfessor, enviroment.roleAdmin],
        },
      },
      {
        path: 'alunos/atualizar/:matricula',
        component: AlunosAtualizacaoComponent,
        data: {
          expectedRoles: [enviroment.roleProfessor, enviroment.roleAdmin],
        },
      },
      {
        path: 'alunos/deletar/:matricula',
        component: AlunosComponent,
        data: {
          expectedRoles: [enviroment.roleProfessor, enviroment.roleAdmin],
        },
      },
    ],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
