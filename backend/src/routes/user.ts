import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router({ mergeParams: true });

router.post('/', UserController.createValidation , UserController.create);
router.get('/', UserController.getAllValidation, UserController.getAll);
router.get('/confirmar-email', UserController.confirmEmail);
router.get('/:id', UserController.getByIdValidation, UserController.getById);
router.put('/:id', UserController.updateValidation, UserController.update);


export {router};