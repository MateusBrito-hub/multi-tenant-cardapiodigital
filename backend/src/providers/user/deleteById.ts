import { PrismaClient } from '../../prisma/generated/Client';

export const deleteById = async (prisma: PrismaClient, id: number): Promise<void | Error> => {
    try {
        await prisma.usuario.delete({ where: { id } });
    } catch {
        return new Error('Erro ao excluir o usuário');
    }
};