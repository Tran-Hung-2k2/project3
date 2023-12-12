import type from './course.type';
import service from '../../services/week.service';

const action = {
    addCourse: (data) => {
        return {
            type: type.ADD_COURSE,
            payload: data,
        };
    },

    addWeek: (data) => {
        return {
            type: type.ADD_WEEK,
            payload: data,
        };
    },

    deleteWeek: (id) => async (dispatch) => {
        await service.deleteWeek(id);
        dispatch({
            type: type.DELETE_WEEK,
            payload: id,
        });
    },
};

export default action;
