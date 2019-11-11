import * as Yup from 'yup';
import { parseISO, startOfHour, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

class AppointmentController {
    async index(req, res) {
        try {
            const { page = 1 } = req.query;

            const appointments = await Appointment.findAll({
                where: {
                    user_id: req.userId,
                    canceled_at: null
                },
                order: ['date'],
                attributes: ['id', 'date'],
                limit: 20,
                offset: (page - 1) * 20,
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
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async store(req, res) {
        try {
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
            
            if (req.userId === provider_id) {
                return res
                    .status(401)
                    .json({ error: "The provider is the same as the user and therefore cannot schedule an appointment." });
            }

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
            
            const user = await User.findByPk(req.userId);
            const formattedDate = format(hourStart, "'dia' dd 'de' MMMM', às' H:mm'h'", {locale: pt});

            await Notification.create({
                content: `New Appointment for ${user.name} ${formattedDate}`,
                user: provider_id,
            })

            return res.status(201).json(appointment);

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async delete(req, res) {

        const appointment = await Appointment.findByPk(req.params.id);

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                error: "You don't have permision to cancel this appointment."
            });
        }

        const dateWithSub = subHours(appointment.date, 2);

        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({ 
                error: "You can only cancel appointment 2 hours in advance."
            });
        }

        appointment.canceled_at = new Date();
        await appointment.save();

        return res.status(201).json(appointment);
    }
}

export default new AppointmentController();
