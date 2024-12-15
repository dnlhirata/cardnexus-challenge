import { Router } from 'express';
import CardRoutes from './CardRoutes';

const router = Router();

const cardRouter = Router();
cardRouter.get('/', CardRoutes.findAll);
router.use('/cards', cardRouter);

export default router;
