import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { central } from '../../prisma/index';
import { userProvider } from '../../providers/user';
import { IUser } from '../../shared/models';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares/validation';
import { EmailService } from '../../shared/services/emailService';
import crypto from 'crypto';

interface IBodyProps extends Omit<IUser, 'id' | 'mailToken' | 'verified'> { }

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
    }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response): Promise<void> => {
    try {
        // Gera token de confirmação de e-mail
        const mailToken = await new Promise<string>((resolve, reject) => {
            crypto.randomBytes(32, (err, buffer) => {
                if (err) reject(err);
                resolve(buffer.toString('hex'));
            });
        });

        const result = await userProvider.create(central, {
            ...req.body,
            mailToken,
            verified: false,
        });

        if (result instanceof Error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: { default: result.message }
            });
            return;
        }

        EmailService.sendConfirmationEmail(req.body.email, req.body.name, mailToken)
            .catch(err => console.error('Falha ao enviar email:', err));

        res.status(StatusCodes.CREATED).json({ id: result });
        return;

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro ao cadastrar e enviar e-mail" });
        return;
    }
};
