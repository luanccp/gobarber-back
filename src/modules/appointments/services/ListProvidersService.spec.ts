import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProvidersService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviders = new ListProviderService(fakeUsersRepository, fakeCacheProvider);
  })

  it('should be able to show the profile', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })


    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456'
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })


    expect(providers).toEqual([
      user1,
      user2
    ]);
  });

  // it('should not be able to show the profile from non-existing user.', async () => {

  //   await expect(listProviders.execute({
  //     user_id: 'non-existing-user-id',
  //   })).rejects.toBeInstanceOf(AppError);
  // });
});