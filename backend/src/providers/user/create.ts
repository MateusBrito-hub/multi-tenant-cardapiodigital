import { PrismaClient } from '../../prisma/generated/Client';
import { IUsuario } from '../../models'

export const create = async (prisma: PrismaClient, dados: Omit<IUsuario, 'id'>): Promise<number | Error> => {
    try {
        if (!dados) {
            return new Error('Dados incompletos para cadastro do usuário');
        }
        const validateEmail = await prisma.usuario.findUnique({
            where: { email: dados.email }
        });

        if (validateEmail) {
            return new Error('E-mail já cadastrado');
        }
        const usuario = await prisma.usuario.create({
            data: dados,
        });

        return usuario.id;
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return new Error('E-mail já cadastrado');
        }
        console.log(error);
        return new Error('Erro ao cadastrar o usuário');
    }
};