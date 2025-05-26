import { PrismaClient } from '../../prisma/generated/Client';

export const getAll = async (prisma: PrismaClient): Promise<object[] | Error> => {
    try {
        return await prisma.usuario.findMany();
    } catch {
        return new Error('Erro ao listar os usuários');
    }
};