import { Router } from 'express';
import {router as UserRoutes} from './user';
import {router as CompanyRoutes} from './company';

const router = Router();

router.use('/user', UserRoutes)
router.use('/company', CompanyRoutes);

export {router};