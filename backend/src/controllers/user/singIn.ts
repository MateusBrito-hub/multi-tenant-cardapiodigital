import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { userProvider } from '../../providers/user';
import { IUser } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { JWTService, passwordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'mailToken' | 'verified' | 'name'> { }

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(6),
    }))
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await userProvider.getByEmail(central, email);
        if (user instanceof Error) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: 'E-mail ou senha inválidos.' }
            });
            return
        }

        const passwordMatch = await passwordCrypto.verifyPassword(password, user.password);
        if (!passwordMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: 'E-mail ou senha inválidos.' }
            });
            return;
        }

        if (!user.verified) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                errors: { default: 'Confirme seu e-mail antes de fazer login.' }
            });
            return;
        }

        const accessToken = JWTService.sign({ uid: user.id });
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: { default: 'Erro ao gerar token de acesso.' }
            });
            return;
        }

        res.status(StatusCodes.OK).json({ accessToken });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro interno ao tentar fazer login.' }
        });
        return;
    }
};
