import axios from './axios.service';

const service = {
    getParticipatingCourse: async (params) => {
        const queryParams = ['User_ID', 'Course_ID', 'Status'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }
        const response = await axios.get('/api/participating_course', { withCredentials: true, params: paramsObject });

        return response.data;
    },

    getParticipatingCourseOrg: async () => {
        const response = await axios.get('/api/participating_course/org/', { withCredentials: true });

        return response.data;
    },

    addParticipatingCourse: async (data) => {
        const response = await axios.post('/api/participating_course', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateParticipatingCourse: async (data, id) => {
        const response = await axios.patch(`/api/participating_course/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateParticipatingCourseStatus: async (data, user_ID, Course_ID) => {
        const response = await axios.patch(`/api/participating_course/status/${user_ID}/${Course_ID}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteParticipatingCourse: async (user_ID, Course_ID) => {
        const response = await axios.delete(`/api/participating_course/${user_ID}/${Course_ID}}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
