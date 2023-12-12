import axios from './axios.service';

const service = {
    getLesson: async (params) => {
        const queryParams = ['Lesson_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }
        const response = await axios.get('/api/lesson', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addLesson: async (data) => {
        const response = await axios.post('/api/lesson', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateLesson: async (data, id) => {
        const response = await axios.patch(`/api/lesson/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteLesson: async (id) => {
        const response = await axios.delete(`/api/lesson/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
