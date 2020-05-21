import express, { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router()
const providersController = new ProvidersController();

providersRouter.use(express.json());
providersRouter.use(ensureAuthenticated);

providersRouter.get("/",providersController.index);

export default providersRouter