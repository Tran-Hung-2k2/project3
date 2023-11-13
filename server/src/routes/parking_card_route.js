import express from 'express';
import parking_card_controller from '../controllers/parking_card_controller.js';
import auth_middleware from '../middlewares/auth_middlewares.js';
import { validate } from 'express-validation';
import parking_card_validation from '../validations/parking_card_validation.js';
const parking_card_route = express.Router();

parking_card_route
    .route('/')
    .get(auth_middleware.verify_admin, parking_card_controller.get_all_parking_card)
    .post(
        validate(parking_card_validation.add_parking_card()),
        auth_middleware.verify_admin,
        parking_card_controller.add_parking_card,
    );

parking_card_route
    .route('/:id')
    .get(auth_middleware.verify_all_user, parking_card_controller.get_parking_card_by_id)
    .patch(
        validate(parking_card_validation.update_parking_card()),
        auth_middleware.verify_admin,
        parking_card_controller.update_parking_card,
    )
    .delete(auth_middleware.verify_admin, parking_card_controller.delete_parking_card);

parking_card_route
    .route('/user/:id')
    .get(auth_middleware.verify_admin_and_user, parking_card_controller.get_parking_card_by_user);

export default parking_card_route;
