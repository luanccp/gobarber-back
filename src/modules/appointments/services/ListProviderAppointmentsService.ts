import "reflect-metadata";
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from "../infra/typeorm/entities/Appointment";
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICasheProvider';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}


@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {

    const cacheData = await this.cacheProvider.recover('asd');
    console.log(cacheData);

    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id, month, year, day
    })

    // await this.cacheProvider.save('asd', 'asd');

    return appointments;

  }
}

export default ListProviderAppointmentsService