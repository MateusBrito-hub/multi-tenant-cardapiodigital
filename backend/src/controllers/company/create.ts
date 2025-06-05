import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { companyProvider } from '../../providers';
import { ICompany } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

interface IBodyProps extends Omit<ICompany, 'id'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        businessName: yup.string().required(),
        cnpj: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        phone: yup.string().required(),
        address: yup.string().required(),
        description: yup.string().optional(),
        slug: yup.string().optional(),
        logoUrl: yup.string().optional(),
        dbUrl: yup.string().optional(),
    }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
    try {
        const result = await companyProvider.create(central, req.body);
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