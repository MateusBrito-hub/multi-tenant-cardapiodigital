import { PrismaClient } from '../../prisma/generated/Tenant';
import { IUserUpdate } from '../../shared/models';
import bcrypt from 'bcrypt';

export const update = async (prisma: PrismaClient, id: number, dados: IUserUpdate): Promise<void | Error> => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) return new Error('Usuário não encontrado');

        if (dados.password) {
            const hashedPassword = await bcrypt.hash(dados.password, 10);
            dados.password = hashedPassword;
        }
        
        await prisma.user.update({
            where: { id },
            data: dados,
        });
    } catch {
        return new Error('Erro ao atualizar o usuário');
    }
};