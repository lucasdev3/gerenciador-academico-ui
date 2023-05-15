import { IAlunosDto } from "./aluno.dto";

export interface ILoginDto {
  username: string;
  password: string;
}

export interface IRegisterDto {
  registerUsuarioDto: {
    username: string;
    password: string;
    role: string;
  };
  matricula: string;
  nome: string;
  email: string;
  dataNascimento: string;
}
