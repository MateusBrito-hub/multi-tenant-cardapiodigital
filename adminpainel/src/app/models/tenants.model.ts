export interface ITenant {
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
