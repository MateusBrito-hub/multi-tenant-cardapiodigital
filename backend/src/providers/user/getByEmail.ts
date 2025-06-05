import { PrismaClient } from '../../prisma/generated/Tenant';

export const getByEmail = async (prisma: PrismaClient, email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return new Error('Usuário não encontrado');

        return user;
    } catch {
        return new Error('Erro ao consultar o usuário');
    }
};