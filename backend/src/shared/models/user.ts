export interface IUser {
    id: number
    name: string;
    email: string;
    password: string;
    mailToken?: string;
    verified?: boolean;
}

export interface IUserUpdate {
    name?: string;
    email?: string;
    password?: string;
}