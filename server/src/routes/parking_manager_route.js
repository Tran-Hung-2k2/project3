import express from 'express';
import auth_middleware from '../middlewares/auth_middlewares.js';
import parking_manager_controller from '../controllers/parking_manager_controller.js';
import { validate } from 'express-validation';
import parking_manager_validation from '../validations/parking_manager_validation.js';
const parking_manager_route = express.Router();

parking_manager_route
    .route('/')
    .get(auth_middleware.verify_admin, parking_manager_controller.get_all_parking_manager)
    .post(
        validate(parking_manager_validation.add_parking_manager()),
        auth_middleware.verify_admin,
        parking_manager_controller.add_parking_manager,
    );

parking_manager_route
    .route('/:user_id/:parking_id')
    .patch(
        validate(parking_manager_validation.update_parking_manager()),
        auth_middleware.verify_admin_and_manager,
        parking_manager_controller.update_parking_manager,
    )
    .delete(auth_middleware.verify_admin, parking_manager_controller.delete_parking_manager);

export default parking_manager_route;
