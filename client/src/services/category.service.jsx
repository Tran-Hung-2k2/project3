import axios from './axios.service';

const service = {
    getCategory: async (params) => {
        const queryParams = ['Category_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/category', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    addCategory: async (data) => {
        const response = await axios.post('/api/category', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateCategory: async (data, id) => {
        const response = await axios.patch(`/api/category/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteCategory: async (id) => {
        const response = await axios.delete(`/api/category/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
