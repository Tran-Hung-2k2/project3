import type from './course.type';
import service from '../../services/course.service';

const action = {
    setCourse: (id, callback) => async (dispatch) => {
        const response = await service.getCourseDetail({ Course_ID: id });
        dispatch({
            type: type.SET_COURSE,
            payload: response.data,
        });
        if (callback) callback(response.data);
    },

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

    addLecture: (data) => {
        return {
            type: type.ADD_LECTURE,
            payload: data,
        };
    },
};

export default action;
