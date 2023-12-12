import type from './course.type';
import service from '../../services/lecture.service';

const action = {
    addWeek: (data) => {
        return {
            type: type.ADD_WEEK,
            payload: data,
        };
    },

    addLecture: (data) => {
        return {
            type: type.ADD_LECTURE,
            payload: data,
        };
    },

    deleteLecture: (id) => async (dispatch) => {
        await service.deleteLecture(id);
        dispatch({
            type: type.DELETE_LECTURE,
            payload: id,
        });
    },
};

export default action;
