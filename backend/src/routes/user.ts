import { Router } from 'express';
import { UserController } from '../controllers/user';

const router = Router({ mergeParams: true });

router.post('/', UserController.createValidation , UserController.create);
router.get('/', UserController.getAllValidation, UserController.getAll);
router.get('/:id', UserController.getByIdValidation, UserController.getById);
router.put('/:id', UserController.updateValidation, UserController.update);
router.delete('/:id', UserController.deleteByIdValidation, UserController.deleteById);

export {router};