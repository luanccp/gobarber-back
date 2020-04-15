import Appointment from '../models/Appointment';
import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy';
import { startOfHour } from 'date-fns';


interface Request {
  provider: string,
  date: Date
}
class CreateAppointmentService {
  private appointmentsRepositoy: AppointmentsRepositoy;

  constructor(appointmentsRepositoy: AppointmentsRepositoy) {
    this.appointmentsRepositoy = appointmentsRepositoy
  }

  public execute({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepositoy.findByDate(date)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepositoy.create({
      provider,
      date: appointmentDate
    })

    return appointment;
  }
}
export default CreateAppointmentService