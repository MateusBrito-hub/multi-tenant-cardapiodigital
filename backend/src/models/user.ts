export interface IUsuario {
    id: number
    nome: string;
    email: string;
    senha: string;
    role: 'admin' | 'consumidor'; // Ajuste conforme seu enum `Role`
}

export interface IUsuarioUpdate {
    nome?: string;
    email?: string;
    senha?: string;
    role?: 'admin' | 'consumidor';
}