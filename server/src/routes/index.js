import authRouter from './auth_route.js';

export default (app) => {
    app.use('/auth', authRouter);
};
