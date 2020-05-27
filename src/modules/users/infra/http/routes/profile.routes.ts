import express, { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController'
import { Segments, celebrate } from 'celebrate';
import Joi from '@hapi/joi';

const profileRouter = Router()
profileRouter.use(ensureAuthenticated);

const profileController = new ProfileController();
profileRouter.put("/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    }
  }), profileController.update);
profileRouter.get("/", profileController.show);


export default profileRouter