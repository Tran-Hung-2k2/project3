import express from 'express';
import parking_record_route_controller from '../controllers/parking_record_route_controller.js';
const parking_record_route = express.Router();

parking_record_route.get('/', (req, res) => {
    res.json({ message: 'parking_record' });
});

export default parking_record_route;
