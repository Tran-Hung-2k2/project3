import express from 'express';
import parking_controller from '../controllers/parking_controller.js';
const parking_route = express.Router();

parking_route.get('/', (req, res) => {
    res.json({ message: 'parking' });
});

export default parking_route;
