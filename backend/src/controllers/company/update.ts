import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { companyProvider } from '../../providers';
import { ICompanyUpdate } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

interface IParamsProps {
    cnpj?: string,
}

interface IBodyProps extends Omit<ICompanyUpdate, 'id'> { }

export const updateValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
            name: yup.string().optional(),
            businessName: yup.string().optional(),
            cnpj: yup.string().optional(),
            email: yup.string().email().optional(),
            password: yup.string().min(6).optional(),
            phone: yup.string().optional(),
            address: yup.string().optional(),
            description: yup.string().optional(),
            slug: yup.string().optional(),
            logoUrl: yup.string().optional(),
            dbUrl: yup.string().optional(),
        })),
    params: getSchema<IParamsProps>(yup.object().shape({
        cnpj: yup.string().required()
    }))
}));


export const update = async (req: Request<IParamsProps,{},IBodyProps>, res: Response): Promise<void> => {
    if(!req.params.cnpj) res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'O parâmetro "CNPJ" precisa ser informado'
        }
    });

    const result = await companyProvider.update(central, req.params.cnpj as string, req.body);
    if (result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
		return;
    }

    res.status(StatusCodes.NO_CONTENT).send();
	return;
};