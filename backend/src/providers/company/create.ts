import { PrismaClient } from '../../prisma/generated/Tenant';
import { ICompany } from '../../shared/models'
import bcrypt from 'bcrypt';
import { gerarSlug } from '../../utils/slug';
import { criarBanco, migrarBanco } from '../../utils/dbTools';
import { encrypt } from '../../utils/crypto';

export const create = async (prisma: PrismaClient, dados: Omit<ICompany, 'id'>): Promise<Number | Error> => {
    try {
        const slug = gerarSlug(dados.name);
        const dbName = `tenant_${slug.replace(/-/g, "_")}`;
        const dbUrl = `${process.env.CLIENT_DATABASE_URL}${dbName}`;

        if (!dados) {
            return new Error('Dados incompletos para cadastro do usuário');
        }
        const validateEmail = await prisma.tenant.findUnique({
            where: { email: dados.email }
        });

        if (validateEmail) {
            return new Error('E-mail já cadastrado');
        }
        const validateSlug = await prisma.tenant.findUnique({
            where: { slug: slug }
        });

        if (validateSlug) {
            return new Error('Empresa já cadastrado');
        }

        await criarBanco(dbName);
        migrarBanco(dbUrl);

        const encryptedDbUrl = encrypt(dbUrl);
        const hashedPassword = await bcrypt.hash(dados.password, 10);

        const tenant = await prisma.tenant.create({
            data: {
                ...dados,
                slug,
                dbUrl: encryptedDbUrl, 
                password: hashedPassword
            },
        });

        return tenant.id;
    } catch (error) {
        if (error instanceof Error && error.message.includes('Unique constraint')) {
            return new Error('E-mail já cadastrado');
        }
        console.log(error);
        return new Error('Erro ao cadastrar o usuário');
    }
};