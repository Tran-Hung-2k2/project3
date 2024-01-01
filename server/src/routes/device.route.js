import express from 'express';
import { validate } from 'express-validation';
import vld from '../validations/parking.validation.js';
import mdw from '../middlewares/auth.middleware.js';
import ctrl from '../controllers/parking.controller.js';

const route = express.Router();

route
    .route('/')
    .get(mdw.verify_admin, ctrl.get_all_parking)
    .post(validate(vld.add_parking()), mdw.verify_admin, ctrl.add_parking);

route
    .route('/:id')
    .patch(validate(vld.update_parking()), mdw.verify_admin, ctrl.update_parking)
    .delete(mdw.verify_admin, ctrl.delete_parking);

route
    .route('/num_of_vehicles/:id')
    .patch(validate(vld.update_number_of_vehicles()), mdw.verify_manager, ctrl.update_number_of_vehicles);

export default route;
