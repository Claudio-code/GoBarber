import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import Mail from '../../libs/Mail';

class CancellationMail {
    get key() {

    }

    async handle({ data }) {
        const { appointment } = data;
        
        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancelation',
            context: {
                provider: String(appointment.provider.name),
                user: String(appointment.user.name),
                date: String(format(appointment.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {locale: pt})),
            }
        });

    }
}

export default new CancellationMail();