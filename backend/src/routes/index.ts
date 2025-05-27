import { Router } from 'express';
import {router as UserRoutes} from './user';

const router = Router();

router.use('/user', UserRoutes)

export {router};