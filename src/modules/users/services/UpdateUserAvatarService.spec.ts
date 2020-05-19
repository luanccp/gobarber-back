import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UploadUserAvatar', () => {

  beforeEach(()=> {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  })
  it('should be able to update avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'AvatarDoTest.jpg'
    })
    expect(user.avatar).toBe('AvatarDoTest.jpg');
  });

  it('should not be able to update avatar from non exist user', async () => {
    await expect(updateUserAvatar.execute({
      user_id: 'non-exist-user',
      avatarFilename: 'AvatarDoTest.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'AvatarDoTest.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'AvatarDoTest2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('AvatarDoTest.jpg')

    expect(user.avatar).toBe('AvatarDoTest2.jpg');
  });

});