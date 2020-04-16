import { getRepository } from "typeorm"
import uploadConfig from '../config/upload'
import path from 'path'
import fs from 'fs'
import User from "../models/User"

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {

  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const useRepository = getRepository(User)
    const user = await useRepository.findOne(user_id)

    if (!user) {
      throw new Error('Only authenticated users can change avatar.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }
    user.avatar = avatarFilename;

    await useRepository.save(user)

    return user;
  }

}

export default UpdateUserAvatarService