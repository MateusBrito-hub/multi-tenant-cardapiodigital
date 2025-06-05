import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';

const prisma = new PrismaClient();

export const confirmEmail = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.query;

    if (!token || typeof token !== 'string') {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Token inválido.' });
        return
    }

    try {
        const user = await prisma.user.findUnique({
            where: { mailToken: token },
        });

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ error: 'Token não encontrado.' });
            return 
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                verified: true,
                mailToken: null,
            },
        });

        res.status(StatusCodes.OK).json({ message: 'E-mail confirmado com sucesso.' });
        return 
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao confirmar e-mail.' });
        return 
    }
};
