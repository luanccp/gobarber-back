import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepositoy from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepositoy', AppointmentsRepository)
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepositoy)