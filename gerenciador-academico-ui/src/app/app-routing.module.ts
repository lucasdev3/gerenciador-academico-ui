import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlunosComponent } from './pages/dashboard/alunos/alunos.component';
import { AlunosCadastroComponent } from './pages/dashboard/alunos-cadastro/alunos-cadastro.component';
import { AlunosAtualizacaoComponent } from './pages/dashboard/alunos-atualizacao/alunos-atualizacao.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/alunos', component: AlunosComponent },
  { path: 'dashboard/alunos/cadastro', component: AlunosCadastroComponent },
  { path: 'dashboard/alunos/atualizar/:matricula', component: AlunosAtualizacaoComponent },
  { path: 'dashboard/alunos/deletar/:matricula', component: AlunosComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
