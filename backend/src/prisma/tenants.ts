import { PrismaClient } from './generated/Client';

const cache: Record<string, PrismaClient> = {};
const central = new PrismaClient();

export async function getTenantClient(slug: string): Promise<PrismaClient> {
    if (cache[slug]) return cache[slug];

    const tenant = await central.tenant.findUnique({ where: { slug } });
    if (!tenant || !tenant.ativo) throw new Error('Tenant inválido ou inativo');

    const client = new PrismaClient({
        datasources: {
            db: { url: tenant.dbUrl },
        },
    });

    cache[slug] = client;
    return client;
}
