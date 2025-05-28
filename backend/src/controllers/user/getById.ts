import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '../../prisma/generated/Tenant';
import { userProvider } from '../../providers/user';
import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';

interface IParamsProps {
    id?: number,
}

export const getByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));

const prisma = new PrismaClient();

export const getById = async (req: Request<IParamsProps>, res: Response): Promise<void> => {
    if(!req.params.id) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
        
    });

    const result = await userProvider.getById(prisma , Number(req.params.id));
    
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