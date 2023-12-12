import axios from './axios.service';

const service = {
    getLecture: async (params) => {
        const queryParams = ['Lecture_ID', 'Week_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/lecture', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addLecture: async (data) => {
        const response = await axios.post('/api/lecture', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateLecture: async (data, id) => {
        const response = await axios.patch(`/api/lecture/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteLecture: async (id) => {
        const response = await axios.delete(`/api/lecture/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
