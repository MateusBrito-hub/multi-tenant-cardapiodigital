import { PrismaClient } from '../../prisma/generated/Tenant';

export const deleteById = async (prisma: PrismaClient, id: number): Promise<void | Error> => {
    try {
        await prisma.user.delete({ where: { id } });
    } catch {
        return new Error('Erro ao excluir o usuário');
    }
};