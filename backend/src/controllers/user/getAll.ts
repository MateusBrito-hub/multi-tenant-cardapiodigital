import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';
import { userProvider } from '../../providers/user';
import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';

interface IQueryProps {
    page?: number,
    limit?: number,
    filter?: string
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional()
    }))
}));

const prisma = new PrismaClient();

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response): Promise<void> => {
    const result = await userProvider.getAll(prisma, req.query.page || 1, req.query.limit || 7, req.query.filter || '');
    const count = await userProvider.count(prisma, req.query.filter);

    if (result instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message }
        });
        return;
    } else if (count instanceof Error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
        return;
    }
    
    res.setHeader('x-total-count', count);
    res.status(StatusCodes.OK).json(result);
    return;
};
