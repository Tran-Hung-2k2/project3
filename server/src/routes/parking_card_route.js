import express from 'express';
import parking_card_controller from '../controllers/parking_card_controller.js';
const parking_card_route = express.Router();

parking_card_route.get('/', (req, res) => {
    res.json({ message: 'parking_card' });
});

export default parking_card_route;
