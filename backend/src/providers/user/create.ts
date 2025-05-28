import { PrismaClient } from '../../prisma/generated/Tenant';
import { IUser } from '../../shared/models'
import bcrypt from 'bcrypt';

export const create = async (prisma: PrismaClient, dados: Omit<IUser, 'id'>): Promise<number | Error> => {
    try {
        if (!dados) {
            return new Error('Dados incompletos para cadastro do usuário');
        }
        const validateEmail = await prisma.user.findUnique({
            where: { email: dados.email }
        });

        if (validateEmail) {
            return new Error('E-mail já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(dados.password, 10);

        const user = await prisma.user.create({
            data: {
                ...dados,
                password: hashedPassword
            },
        });

        return user.id;
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return new Error('E-mail já cadastrado');
        }
        console.log(error);
        return new Error('Erro ao cadastrar o usuário');
    }
};