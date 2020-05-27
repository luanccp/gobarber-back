import express, { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { Segments, celebrate } from 'celebrate';
import Joi from '@hapi/joi';

const passwordRouter = Router()

const forgotPAsswordController = new ForgotPasswordController();
const resetPAsswordController = new ResetPasswordController();

passwordRouter.post("/forgot",
  celebrate({
    [Segments.BODY]:{
      email: Joi.string().email().required(),
    }
  }), forgotPAsswordController.create );
passwordRouter.post("/reset",
  celebrate({
    [Segments.BODY]:{
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }), resetPAsswordController.create );

export default passwordRouter