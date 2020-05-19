import express, { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router()

const forgotPAsswordController = new ForgotPasswordController();
const resetPAsswordController = new ResetPasswordController();

passwordRouter.post("/forgot", forgotPAsswordController.create );
passwordRouter.post("/reset", resetPAsswordController.create );

export default passwordRouter