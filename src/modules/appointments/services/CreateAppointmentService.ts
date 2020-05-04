import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError';
interface Request {
  provider_id: string,
  date: Date
}
class CreateAppointmentService {

  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepositoy = getCustomRepository(AppointmentsRepositoy)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepositoy.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked',400)
    }

    const appointment = appointmentsRepositoy.create({
      provider_id,
      date: appointmentDate
    })
    await appointmentsRepositoy.save(appointment)
    return appointment;
  }
}
export default CreateAppointmentService