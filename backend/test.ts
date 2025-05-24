import 'dotenv/config'
import { PrismaClient } from './src/prisma/generated/Tenant' // ajuste o caminho se necessário

const prisma = new PrismaClient()

async function main() {
    const tenants = await prisma.tenant.findMany()
    console.log(tenants)
}

main()
