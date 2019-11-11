import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ShceduleController {
    async index(req, res) {
        try {
            const checkUserProvider = await User.findOne({
                where: {
                    id: req.userId,
                    provider: true
                }
            });
            if (!checkUserProvider) {
                return res.status(401).json({ error: "User is not a provider." });
            }
            const { date } = req.query;
    
            const parsedDate = parseISO(date);
    
            const appointments = await Appointment.findAll({
                where: {
                    provider_id: req.userId,
                    canceled_at: null,
                    date: {
                        [Op.between]: [ startOfDay(parsedDate), endOfDay(parsedDate) ],
                    },
                },
                order: ['date'],
            })
    
            return res.status(200).json(appointments);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new ShceduleController();