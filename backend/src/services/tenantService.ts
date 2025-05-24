import { prisma } from '../config/prisma';
import { criarBanco, migrarBanco } from '../utils/dbTools';
import { encrypt } from '../utils/crypto';
import { gerarSlug } from '../utils/slug';

export async function criarTenant(nome: string) {
    const slug = gerarSlug(nome);
    const dbName = `tenant_${slug.replace(/-/g, "_")}`;
    const dbUrl = `postgresql://postgres:12nubivfvuvk@localhost:5432/${dbName}`;

    const existente = await prisma.tenant.findUnique({
        where: { slug },
    });

    if (existente) {
        throw new Error(`O slug "${slug}" já está em uso.`);
    }

    await criarBanco(dbName);
    migrarBanco(dbUrl);

    const encryptedDbUrl = encrypt(dbUrl);

    const tenant = await prisma.tenant.create({
        data: { nome, slug, dbUrl: encryptedDbUrl }
    });

    return tenant;
}
