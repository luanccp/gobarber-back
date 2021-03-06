import "reflect-metadata";
import { injectable, inject } from 'tsyringe';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { getDaysInMonth, getDate } from "date-fns";


interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,

  ) { }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month
    })
    const numberOfDaysInMonths = getDaysInMonth(
      new Date(year, month - 1)
    )

    const eachDayArray = Array.from(
      {length:numberOfDaysInMonths},
      (_, index) => index + 1,
    );

    const availability = eachDayArray.map(day =>{
      const appointmentInDay = appointments.filter(appointment => {
        return getDate(appointment.date) ===day
      })

      return {
        day,
        available: appointmentInDay.length < 10
      }
    })

    return availability;
  }
}

export default ListProviderMonthAvailabilityService