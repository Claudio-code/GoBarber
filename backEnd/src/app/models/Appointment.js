import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours, setHours} from "date-fns";

class Appontment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },
                cancelable: {
                    type:  Sequelize.VIRTUAL,
                    get() {
                        return isBefore(new Date, setHours(this.date, 2));
                    },
                }
            },
            {
                sequelize
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'});
        this.belongsTo(models.User, {foreignKey: 'provider_id', as: 'provider'});
    }

}

export default Appontment;