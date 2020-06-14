import { Router } from 'express';
import translateRouter from './translate.route';

const routes = Router();

routes.use(translateRouter);

export default routes;