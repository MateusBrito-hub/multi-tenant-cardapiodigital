import { PrismaClient } from '../../prisma/generated/Client';

export const getById = async (prisma: PrismaClient, id: number) => {
    try {
        const usuario = await prisma.usuario.findUnique({ where: { id } });

        if (!usuario) return new Error('Usuário não encontrado');

        return usuario;
    } catch {
        return new Error('Erro ao consultar o usuário');
    }
};