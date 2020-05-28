import express, { Router } from 'express'
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'
import { Segments, Joi, celebrate } from 'celebrate';

const usersRouter = Router()
usersRouter.use(express.json())

const upload = multer(uploadConfig.multer)

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post("/",
  celebrate({
    [Segments.BODY]:{
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  })
  ,usersController.create);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default usersRouter