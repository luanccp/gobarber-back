import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

describe('UploadUserAvatar', () => {
  it('should be able to update avatar', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

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

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);


    expect(updateUserAvatar.execute({
      user_id: 'non-exist-user',
      avatarFilename: 'AvatarDoTest.jpg'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {

    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

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