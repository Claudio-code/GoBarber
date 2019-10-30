import * as Yup from 'yup';
import { parseISO, startOfHour, isBefore } from 'date-fns';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
    async index(req, res) {
        const appointments = await Appointment.findAll({
            where: {
                user_id: req.userId,
                canceled_at: null
            },
            order: ['date'],
            attributes: ['id', 'date'],
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model:File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ]
                }
            ]
        });
        return res.status(200).json(appointments);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            provider_id: Yup.number().required(),
            date: Yup.date().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .stauts(400)
                .json({ error: "Validation fails" });
        }

        const { provider_id, date } = req.body;

        /**
        *  check if provider_id is a provider 
        */
        
        const isProvider = await User.findOne({
            where: {
                id: provider_id,
                provider: true
            }
        });

        if (!isProvider) {
            // verifica se o user é um provider
            return res
                .status(401)
                .json({ error: "provider not found" });
        }

        const hourStart = startOfHour(parseISO(date));
        // transforma a data em um objeto e tira os minutos e segundos

        if (isBefore(hourStart, new Date())) {
            // verifica se a data q foi marcada pelo usuari ja nao passou
            return res.status(400).json({ error: "Past dates are not permitted" });
        }

        const checkAvailability = await Appointment.findOne({
            where: {
                provider_id: provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });
        // procurando se tem um agendamento nesse horario com esse provedor q nao foi canselado 
        if (checkAvailability) {
            return res.status(400).json({ error: "Appointment date is not available." });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id: provider_id,
            date: hourStart,
        });
        
        return res.status(201).json(appointment);
    }
}

export default new AppointmentController();
