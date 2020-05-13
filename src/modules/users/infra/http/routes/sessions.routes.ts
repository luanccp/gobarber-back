import express, { Router } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';


const sessionsRouter = Router()
sessionsRouter.use(express.json())


sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  })

  delete user.password;

  return response.json({ user, token })
});

export default sessionsRouter