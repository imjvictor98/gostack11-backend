import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/Error'
import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmetRepository = getCustomRepository(AppointmentsRepository)

    const appointmetDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmetRepository.findByDate(
      appointmetDate
    )

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked')

    const appointment = appointmetRepository.create({
      provider_id,
      date: appointmetDate,
    })

    await appointmetRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
