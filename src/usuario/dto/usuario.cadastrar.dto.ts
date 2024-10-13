export interface UsuarioCadastrarDto {
    user: string;
    email: string;
    password: string;
}

export interface UsuarioRemovedDto {
    id: number;
}