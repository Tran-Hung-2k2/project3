import express from 'express';
import { validate } from 'express-validation';
import auth_middleware from '../middlewares/auth_middlewares.js';
import parking_validation from '../validations/parking_validation.js';
import parking_controller from '../controllers/parking_controller.js';

const parking_route = express.Router();

parking_route
    .route('/')
    .get(auth_middleware.verify_admin, parking_controller.get_all_parking)
    .post(validate(parking_validation.add_parking()), auth_middleware.verify_admin, parking_controller.add_parking);

parking_route
    .route('/:id')
    .patch(
        validate(parking_validation.update_parking()),
        auth_middleware.verify_admin_and_manager,
        parking_controller.update_parking,
    )
    .delete(auth_middleware.verify_admin, parking_controller.delete_parking);

export default parking_route;
