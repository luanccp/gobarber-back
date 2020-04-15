import express, { Router, response, request } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepositoy from '../repositories/AppointmentsRepositoy'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentsRouter = Router()

appointmentsRouter.use(express.json())


appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepositoy = getCustomRepository(AppointmentsRepositoy)
  const appointments = await appointmentsRepositoy.find()

  return response.json(appointments)

})

appointmentsRouter.post("/", async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({ date: parsedDate, provider })

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message })
  }
});

export default appointmentsRouter