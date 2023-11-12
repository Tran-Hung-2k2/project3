import express from 'express';
import parking_record_controller from '../controllers/parking_record_controller.js';
import auth_middleware from '../middlewares/auth_middlewares.js';
const parking_record_route = express.Router();

parking_record_route.get('/', auth_middleware.verify_admin, parking_record_controller.get_all_parking_record);
parking_record_route.post('/', auth_middleware.verify_manager, parking_record_controller.add_parking_record);

export default parking_record_route;
