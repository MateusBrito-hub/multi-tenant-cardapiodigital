import { Router } from 'express';
import {router as UserRoutes} from './user';

const router = Router();

router.use('/:slug/user', UserRoutes)

export {router};