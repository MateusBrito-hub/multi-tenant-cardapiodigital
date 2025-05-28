import 'dotenv/config';
import { criarTenant } from '../src/shared/services/tenantService';

const nome = process.argv[2];

if (!nome) {
    console.error('❌ Nome do tenant é obrigatório. Ex: npm run create-tenant "Pizzaria do Zé"');
    process.exit(1);
}
criarTenant(nome)
    .then((t) => console.log('✅ Tenant criado:', t))
    .catch((e) => console.error('❌ Erro ao criar tenant:', e));
