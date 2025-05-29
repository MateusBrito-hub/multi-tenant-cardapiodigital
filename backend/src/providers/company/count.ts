import { PrismaClient } from '../../prisma/generated/Tenant';

export const count = async (prisma: PrismaClient, filter = ''): Promise<number | Error> => {
    try {
        const total = await prisma.tenant.count({
            where: {
                cnpj: {
                    contains: filter,
                    mode: 'insensitive',
                },
            },
        });

        return total;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar a quantidade total de registros');
    }
};