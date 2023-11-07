import auth_route from './auth_route.js';
import parking_route from '.parking_route.js';
import parking_card_route from '.parking_card_route.js';
import parking_manager_route from '.parking_manager_route.js';
import parking_record_route from '.parking_record_route.js';

export default (app) => {
    app.use('/auth', auth_route);
    app.use('/parking', parking_route);
    app.use('/parking_card', parking_card_route);
    app.use('/parking_manager', parking_manager_route);
    app.use('/parking_record', parking_record_route);
};
