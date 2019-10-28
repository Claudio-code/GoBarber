import Appointment from '../models/Appointment';
import User from '../models/User';
import * as Yup from 'yup';

class AppointmentController {
    async index(req, res) {

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
            return res
                .status(401)
                .json({ error: "provider not found" });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id: provider_id,
            date: date,
        });
        
        return res.status(201).json(appointment);
    }
}

export default new AppointmentController();
