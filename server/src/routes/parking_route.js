import express from 'express';
import parking_controller from '../controllers/parking_controller.js';
import auth_middleware from '../middlewares/auth_middlewares.js';

const parking_route = express.Router();

parking_route
    .route('/')
    .get(auth_middleware.verify_admin, parking_controller.get_all_parking)
    .post(auth_middleware.verify_admin, parking_controller.add_parking);

parking_route
    .route('/:id')
    .put(auth_middleware.verify_admin, parking_controller.update_parking)
    .delete(auth_middleware.verify_admin, parking_controller.delete_parking);

export default parking_route;
