import { PrismaClient as CentralPrismaClient } from './generated/Tenant';
import { PrismaClient as ClientPrismaClient } from './generated/Client';
import { decrypt } from '../utils/crypto';

const cache: Record<string, ClientPrismaClient> = {};
const central = new CentralPrismaClient();

export async function getTenantClient(slug: string): Promise<ClientPrismaClient> {
    if (cache[slug]) return cache[slug];

    const tenant = await central.tenant.findUnique({ where: { slug } });
    if (!tenant || !tenant.ativo) throw new Error('Tenant inválido ou inativo');

    const decryptedDbUrl = decrypt(tenant.dbUrl);

    const client = new ClientPrismaClient({
        datasources: {
            db: { url: decryptedDbUrl },
        },
    });

    cache[slug] = client;
    return client;
}
