import Appointment from '../models/Appointment';
import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

interface Request {
  provider: string,
  date: Date
}
class CreateAppointmentService {

  public async execute({ date, provider }: Request): Promise<Appointment> {
    const appointmentsRepositoy = getCustomRepository(AppointmentsRepositoy)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepositoy.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepositoy.create({
      provider,
      date: appointmentDate
    })
    await appointmentsRepositoy.save(appointment)
    return appointment;
  }
}
export default CreateAppointmentService