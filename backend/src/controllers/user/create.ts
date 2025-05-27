import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';
import { userProvider } from '../../providers/user';

export const create = async (req: Request, res: Response) : Promise<void> => {
    try {
        const prisma = new PrismaClient();
        const result = await userProvider.create(prisma, req.body);

        if (result instanceof Error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: { default: result.message }
            });
            return;
        }

        res.status(StatusCodes.CREATED).json({ id: result })
        return;

    } catch (error) {

        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        return;
    }

}