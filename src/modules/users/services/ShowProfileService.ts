import { getRepository } from "typeorm"
import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'
import IUsersRepository from "../repositories/IUsersRepository"
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.')
    }

    return user;
  }
}

export default ShowProfileService