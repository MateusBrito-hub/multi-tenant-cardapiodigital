import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { userProvider } from '../../providers/user';
import { validation } from '../../shared/middlewares/validation';
import * as yup from 'yup';

interface IParamsProps {
    email?: string,
}

export const getByEmailValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        email: yup.string().required()
    }))
}));

export const getByEmail = async (req: Request<IParamsProps>, res: Response): Promise<void> => {
    if(!req.params.email) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'O parâmetro "Email" precisa ser informado'
        }
        
    });

    const result = await userProvider.getByEmail(central , req.params.email as string);
    
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