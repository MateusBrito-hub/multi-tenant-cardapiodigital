import { execSync } from 'child_process';
import { Client } from 'pg';


export async function criarBanco(dbName: string) {
    const client = new Client({ connectionString: process.env.CLIENT_DATABASE_URL });
    await client.connect();
    await client.query(`CREATE DATABASE "${dbName}"`);
    await client.end();
}

export function migrarBanco(dbUrl: string) {
    execSync(`npx prisma migrate deploy --schema=prisma/client.prisma`, {
        env: { ...process.env, CLIENT_DATABASE_URL: dbUrl },
        stdio: 'inherit',
    });
}
