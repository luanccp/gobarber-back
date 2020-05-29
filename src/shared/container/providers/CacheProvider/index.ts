import { container } from 'tsyringe';
import ICasheProvider from './models/ICasheProvider';
import mailConfig from '@config/mail'
import RedisCacheProvider from './implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICasheProvider>('CacheProvider',providers.redis);