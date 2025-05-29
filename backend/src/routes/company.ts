import { Router } from 'express';
import { CompanyController } from '../controllers';

const router = Router({ mergeParams: true });

router.post('/', CompanyController.createValidation , CompanyController.create);
router.get('/', CompanyController.getAllValidation, CompanyController.getAll);
router.get('/:cnpj', CompanyController.getByCnpjValidation, CompanyController.getByCnpj);
router.put('/:cnpj', CompanyController.updateValidation, CompanyController.update);

export {router};