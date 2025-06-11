export interface ICompany {
    id: number;
    name: string;
    slug?: string;
    dbUrl?: string;
    email: string;
    password: string;
    businessName: string;
    cnpj: string;
    phone: string;
    address: string;
    status: boolean;
    description?: string;
    logoUrl?: string;
}

export interface ICompanyUpdate {
    name?: string;
    slug?: string;
    email?: string;
    password?: string;
    businessName?: string;
    cnpj?: string;
    phone?: string;
    address?: string;
    description?: string;
    logoUrl?: string;
}