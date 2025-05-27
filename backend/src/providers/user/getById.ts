import { PrismaClient } from '../../prisma/generated/Tenant';

export const getById = async (prisma: PrismaClient, id: number) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return new Error('Usuário não encontrado');

        return user;
    } catch {
        return new Error('Erro ao consultar o usuário');
    }
};