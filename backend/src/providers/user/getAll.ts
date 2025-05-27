import { PrismaClient } from '../../prisma/generated/Tenant';

export const getAll = async (prisma: PrismaClient): Promise<object[] | Error> => {
    try {
        return await prisma.user.findMany();
    } catch {
        return new Error('Erro ao listar os usuários');
    }
};