import { PrismaClient } from '../../prisma/generated/Tenant';

export const getByCnpj = async (prisma: PrismaClient, cnpj: string) => {
    try {
        const company = await prisma.tenant.findUnique({ where: { cnpj } });

        if (!company) return new Error('Empresa não encontrado');

        return company;
    } catch {
        return new Error('Erro ao consultar o usuário');
    }
};