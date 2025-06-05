import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router({ mergeParams: true });

router.post('/register', UserController.createValidation , UserController.create);
router.post('/login', UserController.signInValidation, UserController.signIn);
router.get('/', UserController.getAllValidation, UserController.getAll);
router.get('/confirmar-email', UserController.confirmEmail);
router.get('/:id', UserController.getByEmailValidation, UserController.getByEmail);
router.put('/:id', UserController.updateValidation, UserController.update);


export {router};