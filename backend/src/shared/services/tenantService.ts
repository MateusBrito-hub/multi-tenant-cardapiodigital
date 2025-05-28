import { prisma } from '../../config/prisma';
import { criarBanco, migrarBanco } from '../../utils/dbTools';
import { encrypt } from '../../utils/crypto';
import { gerarSlug } from '../../utils/slug';

export async function criarTenant(name: string) {
    const slug = gerarSlug(name);
    const dbName = `tenant_${slug.replace(/-/g, "_")}`;
    const dbUrl = `${process.env.CLIENT_DATABASE_URL}${dbName}`;

    const exist = await prisma.tenant.findUnique({
        where: { slug },
    });

    if (exist) {
        throw new Error(`O slug "${slug}" já está em uso.`);
    }

    await criarBanco(dbName);
    migrarBanco(dbUrl);

    const encryptedDbUrl = encrypt(dbUrl);

    const tenant = await prisma.tenant.create({
        data: { name, slug, dbUrl: encryptedDbUrl, email:`${name}@mail.com`, password: name}
    });

    return tenant;
}
