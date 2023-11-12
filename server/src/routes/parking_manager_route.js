import express from 'express';
import auth_middleware from '../middlewares/auth_middlewares.js';
import parking_manager_controller from '../controllers/parking_manager_controller.js';
const parking_manager_route = express.Router();

parking_manager_route.get('/', auth_middleware.verify_admin, parking_manager_controller.get_all_parking_manager);
parking_manager_route.post('/', auth_middleware.verify_admin, parking_manager_controller.add_parking_manager);
parking_manager_route.put(
    '/:manager_id/:parking_id',
    auth_middleware.verify_admin,
    parking_manager_controller.update_parking_manager,
);
parking_manager_route.delete(
    '/:manager_id/:parking_id',
    auth_middleware.verify_admin,
    parking_manager_controller.delete_parking_manager,
);

export default parking_manager_route;
