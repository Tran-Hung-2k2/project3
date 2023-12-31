import type from './parking.type';
import service from '../../services/auth.service';

const action = {
    addParking: (id) => {
        return {
            type: type.ADD_PARKING,
            payload: id,
        };
    },
};

export default action;
