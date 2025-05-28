import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';
import { userProvider } from '../../providers/user';
import { IUser } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

interface IBodyProps extends Omit<IUser, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    }))
}));

const prisma = new PrismaClient();

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
    try {
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        return;
    }

}