import express, { Router } from 'express';

import SessionsController from '../controllers/SessionsController'
import { Segments, celebrate } from 'celebrate';
import Joi from '@hapi/joi';

const sessionsRouter = Router()
sessionsRouter.use(express.json())

const sessionsController = new SessionsController();


sessionsRouter.post("/", celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), sessionsController.create);

export default sessionsRouter