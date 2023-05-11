import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlunosComponent } from './pages/dashboard/alunos/alunos.component';
import { AlunosCadastroComponent } from './pages/dashboard/alunos-cadastro/alunos-cadastro.component';
import { AlunosAtualizacaoComponent } from './pages/dashboard/alunos-atualizacao/alunos-atualizacao.component';
import { AuthGuard } from './services/guard/auth-guard.service';
import { enviroment } from './enviroments/enviroments';
import { RegisterComponent } from './pages/register/register.component';

const allRoles: string[] = [enviroment.roleAluno, enviroment.roleProfessor, enviroment.roleAdmin]
const professorAdminRoles: string[] = [enviroment.roleProfessor, enviroment.roleAdmin]
const alunoAdminRoles: string[] = [enviroment.roleAluno, enviroment.roleAdmin]

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alunos',
        component: AlunosComponent,
        data: {
          expectedRoles: allRoles,
        },
      },
      {
        path: 'alunos/cadastro',
        component: AlunosCadastroComponent,
        data: {
          expectedRoles: allRoles,
        },
      },
      {
        path: 'alunos/atualizar/:matricula',
        component: AlunosAtualizacaoComponent,
        data: {
          expectedRoles: allRoles
        },
      },
      {
        path: 'alunos/deletar/:matricula',
        component: AlunosComponent,
        data: {
          expectedRoles: allRoles,
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
