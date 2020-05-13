import express, { Router } from 'express';

import SessionsController from '../controllers/SessionsController'

const sessionsRouter = Router()
sessionsRouter.use(express.json())

const sessionsController = new SessionsController();


sessionsRouter.post("/", sessionsController.create );

export default sessionsRouter