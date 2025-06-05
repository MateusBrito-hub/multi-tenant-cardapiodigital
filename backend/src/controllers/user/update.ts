import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { userProvider } from '../../providers/user';
import { IUserUpdate } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';

interface IParamsProps {
    id?: number,
}

interface IBodyProps extends Omit<IUserUpdate, 'id'> { }

export const updateValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required()
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));

export const update = async (req: Request<IParamsProps,{},IBodyProps>, res: Response): Promise<void> => {
    if(!req.params.id) res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
    });

    const result = await userProvider.update(central, Number(req.params.id), req.body);
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