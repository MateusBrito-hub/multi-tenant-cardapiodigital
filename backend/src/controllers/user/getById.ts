import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
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

export const getById = async (req: Request<IParamsProps>, res: Response): Promise<void> => {
    if(!req.params.id) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
        
    });

    const result = await userProvider.getById(central , Number(req.params.id));
    
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