import express, { Router, response } from 'express'
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';

const usersRouter = Router()

usersRouter.use(express.json())
const upload = multer(uploadConfig)


usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    })

    delete user.password;

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {

  return response.json({ ok: true })
})

export default usersRouter