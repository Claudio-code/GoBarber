import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import Mail from '../../libs/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        try {
            const { appointment } = data;
            
            await Mail.sendMail({
                to: `${appointment.provider.name} <${appointment.provider.email}>`,
                subject: 'Agendamento cancelado',
                template: 'cancelation',
                context: {
                    provider: appointment.provider.name,
                    user: appointment.user.name,
                    date: format(parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'h'", {locale: pt}),
                }
            });
            
        } catch (error) {
            console.log(error);
            throw error;
                
        }
    }
}

export default new CancellationMail();