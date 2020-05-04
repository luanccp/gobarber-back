import express, { Router, response, request } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepositoy from '@modules/appointments/repositories/AppointmentsRepositoy';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(express.json())

appointmentsRouter.use(ensureAuthenticated)


appointmentsRouter.get('/', async (request, response) => {

  console.log(request.user)
  const appointmentsRepositoy = getCustomRepository(AppointmentsRepositoy)
  const appointments = await appointmentsRepositoy.find()

  return response.json(appointments)

})

appointmentsRouter.post("/", async (request, response) => {

  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService()
  const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

  return response.json(appointment);

});

export default appointmentsRouter