import type from './course.type';
import service from '../../services/lesson.service';

const action = {
    addLecture: (data) => {
        return {
            type: type.ADD_LECTURE,
            payload: data,
        };
    },

    addLesson: (data) => {
        return {
            type: type.ADD_LESSON,
            payload: data,
        };
    },

    deleteLesson: (id) => async (dispatch) => {
        await service.deleteLesson(id);
        dispatch({
            type: type.DELETE_LESSON,
            payload: id,
        });
    },
};

export default action;
