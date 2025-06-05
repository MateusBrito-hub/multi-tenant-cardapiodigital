import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next): Promise<void> => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado!' }
        });
        return;
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Não autenticado!' }
        });
        return;
    }

    const JwtData = JWTService.verify(token);

    if (JwtData === 'JWT_SECRET_NOT_FOUND') {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Erro ao verificar o Token!' }
        });
        return;
    } else if (JwtData === 'INVALID_TOKEN') {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: 'Não autenticado!' }
        });
        return;
    }

    req.headers.idUsuario = JwtData.uid.toString();

    return next();
};