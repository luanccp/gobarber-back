import express, { Router, response, request } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()
const appointmentsRepositoy = new AppointmentsRepositoy();

appointmentsRouter.use(express.json())


appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepositoy.all()

  return response.json(appointments)

})

appointmentsRouter.post("/", (request, response) => {
  try {

    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepositoy)

    const appointment = createAppointment.execute({ date: parsedDate, provider })
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message })

  }
});

export default appointmentsRouter