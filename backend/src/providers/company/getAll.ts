import { PrismaClient, Prisma } from '../../prisma/generated/Tenant';

export const getAll = async (prisma: PrismaClient, page: number, limit: number, filter: string, cnpj: string = ''): Promise<object[] | Error> => {
    try {
        const whereCondition: Prisma.TenantWhereInput = {};

        if (cnpj != '') {
            whereCondition.cnpj = cnpj;
        }

        if (filter) {
            whereCondition.name = {
                contains: filter,
                mode: 'insensitive',
            };
        }

        const result = await prisma.tenant.findMany({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: Number(limit)
        });

        if (cnpj != '' && !result.some((item) => item.cnpj === cnpj)) {
            const itemByCnpj = await prisma.tenant.findUnique({ where: { cnpj } });
            if (itemByCnpj) return [...result, itemByCnpj];
        }
        return result;
    } catch(error) {
        console.error('Erro ao listar os usuários:', error);
        return new Error('Erro ao listar os usuários');
    }
};