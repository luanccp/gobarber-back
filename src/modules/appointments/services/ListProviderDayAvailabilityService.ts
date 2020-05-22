import "reflect-metadata";
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate, getHours, isAfter } from "date-fns";


interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,

  ) { }

  public async execute({ provider_id, month, year, day }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      month,
      year,
      day
    })

    const hourStart = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        // possui apontamento? estou marcando um apontamento para o futuro?
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    })
    return availability;
  }
}

export default ListProviderDayAvailabilityService