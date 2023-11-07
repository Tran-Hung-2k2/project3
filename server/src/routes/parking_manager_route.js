import express from 'express';
import parking_manager_controller from '../controllers/parking_manager_controller.js';
const parking_manager_route = express.Router();

parking_manager_route.get('/', (req, res) => {
    res.json({ message: 'parking_manager' });
});

export default parking_manager_route;
