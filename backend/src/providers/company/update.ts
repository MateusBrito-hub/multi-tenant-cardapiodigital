import { PrismaClient } from '../../prisma/generated/Tenant';
import { ICompanyUpdate } from '../../shared/models';
import bcrypt from 'bcrypt';
import { gerarSlug } from '../../utils/slug';

export const update = async (prisma: PrismaClient, cnpj: string, dados: ICompanyUpdate): Promise<void | Error> => {
    try {
        const company = await prisma.tenant.findUnique({ where: { cnpj } });

        if (!company) return new Error('Empresa não encontrada');

        if (dados.name) {
            const slug = gerarSlug(dados.name);
            const validateSlug = await prisma.tenant.findUnique({
                where: { slug: slug }
            });

            if (validateSlug) {
                return new Error('Empresa já cadastrado');
            }
            dados.slug = slug;
        }

        if (dados.password) {
            const hashedPassword = await bcrypt.hash(dados.password, 10);
            dados.password = hashedPassword;
        }

        await prisma.tenant.update({
            where: { cnpj },
            data: dados,
        });
    } catch {
        return new Error('Erro ao atualizar a empresa');
    }
};