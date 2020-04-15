import express, { Router, response, request } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy'

const appointmentsRouter = Router()
const appointmentsRepositoy = new AppointmentsRepositoy();
appointmentsRouter.use(express.json())


appointmentsRouter.get('/', (request, response)=>{
  const appointments = appointmentsRepositoy.all()

  return response.json(appointments)

})

appointmentsRouter.post("/", (request, response) => {

  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointmentsRepositoy.findByDate(parsedDate)

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: "This appointment is already booked" })
  }

  const appointment = appointmentsRepositoy.create(provider, parsedDate)


  return response.json(appointment);
});

export default appointmentsRouter