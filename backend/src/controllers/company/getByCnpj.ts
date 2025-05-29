import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';
import { companyProvider } from '../../providers';
import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';

interface IParamsProps {
    cnpj?: string,
}

export const getByCnpjValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        cnpj: yup.string().required()
    }))
}));

const prisma = new PrismaClient();

export const getByCnpj = async (req: Request<IParamsProps>, res: Response): Promise<void> => {
    if(!req.params.cnpj) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
        
    });

    const result = await companyProvider.getByCnpj(prisma, req.params.cnpj as string);
    
    if (result instanceof Error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
		return;
    }
    res.status(StatusCodes.OK).json(result);
	return;
};