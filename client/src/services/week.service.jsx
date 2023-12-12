import axios from './axios.service';

const service = {
    getWeek: async (params) => {
        const queryParams = ['Week_ID', 'Course_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/week', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addWeek: async (data) => {
        const response = await axios.post('/api/week', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateWeek: async (data, id) => {
        const response = await axios.patch(`/api/week/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },


    deleteWeek: async (id) => {
        const response = await axios.delete(`/api/week/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
