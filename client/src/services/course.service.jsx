import axios from './axios.service';

const service = {
    getCourses: async (params) => {
        const queryParams = ['Course_ID', 'Category_ID', 'User_ID', 'Status', 'Name'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }
        console.log(paramsObject);
        const response = await axios.get('/api/course', {
            params: paramsObject,
        });

        return response.data;
    },

    getCourseDetail: async (params) => {
        const queryParams = ['Course_ID'];
        const paramsObject = {};

        if (params) {
            queryParams.forEach((param) => {
                if (params[param]) {
                    paramsObject[param] = params[param];
                }
            });
        }

        const response = await axios.get('/api/course/detail', {
            params: paramsObject,
        });

        return response.data;
    },

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

    addCourse: async (data) => {
        const response = await axios.post('/api/course', data, {
            withCredentials: true,
        });

        return response.data;
    },

    updateCourse: async (data, id) => {
        const response = await axios.patch(`/api/course/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteCourse: async (id) => {
        const response = await axios.delete(`/api/course/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
