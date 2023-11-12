import express from 'express';
import parking_card_controller from '../controllers/parking_card_controller.js';
import auth_middleware from '../middlewares/auth_middlewares.js';
const parking_card_route = express.Router();

parking_route.get('/', auth_middleware.verify_admin, parking_card_controller.get_all_parking_card);
parking_route.post('/', auth_middleware.verify_admin, parking_card_controller.add_parking_card);
parking_route.put('/:id', auth_middleware.verify_admin, parking_card_controller.update_parking_card);
parking_route.delete('/:id', auth_middleware.verify_admin, parking_card_controller.delete_parking_card);

export default parking_card_route;
