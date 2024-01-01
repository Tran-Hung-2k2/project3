import axios from './axios.service';

const service = {
    getAllParkingCard: async () => {
        const response = await axios.get('/api/parking_card', { withCredentials: true });
        return response.data;
    },

    getParkingCardByUser: async () => {
        const response = await axios.get('/api/parking_card/user', { withCredentials: true });
        return response.data;
    },

    addParkingCard: async (data) => {
        const response = await axios.post('/api/parking_card', data, { withCredentials: true });
        return response.data;
    },

    updateParkingCard: async (data, id) => {
        const response = await axios.patch(`/api/parking_card/${id}`, data, {
            withCredentials: true,
        });

        return response.data;
    },

    deleteParkingCard: async (id) => {
        const response = await axios.delete(`/api/parking_card/${id}`, {
            withCredentials: true,
        });

        return response.data;
    },
};

export default service;
