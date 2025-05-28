import { PrismaClient } from '../../prisma/generated/Tenant';

export const getAll = async (prisma: PrismaClient, page: number, limit: number, filter: string, id = 0): Promise<object[] | Error> => {
    try {
        const whereCondition: any = {
            OR: [
                id > 0 ? { id: id } : undefined,
                filter ? { name: { contains: filter, mode: 'insensitive' } } : undefined,
            ].filter(Boolean)
        };
        const result = await prisma.user.findMany({
            where: whereCondition,
            skip: (page - 1) * limit,
            take: limit
        });

        if (id > 0 && !result.some((item) => item.id === id)) {
            const itemById = await prisma.user.findUnique({ where: { id } });
            if (itemById) return [...result, itemById];
        }
        return result;
    } catch {
        return new Error('Erro ao listar os usuários');
    }
};