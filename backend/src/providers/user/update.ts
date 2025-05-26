import { PrismaClient } from '../../prisma/generated/Client';
import { IUsuarioUpdate } from '../../models';

export const update = async (
    prisma: PrismaClient,
    id: number,
    dados: IUsuarioUpdate
): Promise<void | Error> => {
    try {
        const usuarioExiste = await prisma.usuario.findUnique({ where: { id } });

        if (!usuarioExiste) return new Error('Usuário não encontrado');

        await prisma.usuario.update({
            where: { id },
            data: dados,
        });
    } catch {
        return new Error('Erro ao atualizar o usuário');
    }
};