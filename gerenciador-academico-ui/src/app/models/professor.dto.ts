export interface IProfessorDto {
    id: string;
    nome: string;
    email: string;
    dataNascimento: string;
}


export interface IProfessorSaveDto {
    nome: string;
    email: string;
    dataNascimento: string;
}