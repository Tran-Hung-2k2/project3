import jwt from 'jsonwebtoken';
import db from '../models/index.js';

const auth_middleware = {
    verify_token(req, res, next) {
        const access_token = req.cookies.access_token;
        if (access_token) {
            jwt.verify(access_token, process.env.JWT_ACCESS_KEY, (err, token) => {
                if (err) {
                    return res.status(403).json({
                        is_error: true,
                        message: 'Bạn không có quyền truy cập tài nguyên này',
                    });
                }
                req.token = token;
                next();
            });
        } else {
            return res.status(401).json({
                is_error: true,
                message: 'Vui lòng đăng nhập để tiếp tục',
            });
        }
    },

    verify_user(req, res, next) {
        auth_middleware.verify_token(req, res, async () => {
            const isUser = await db.User.findByPk(req.token.id);
            if (isUser) {
                next();
            } else {
                return res.status(403).json({
                    is_error: true,
                    message: 'Bạn không có quyền truy cập tài nguyên này',
                });
            }
        });
    },

    verify_manager(req, res, next) {
        auth_middleware.verify_token(req, res, async () => {
            const isManager = await db.Manager.findByPk(req.token.id);
            if (isManager) {
                next();
            } else {
                return res.status(403).json({
                    is_error: true,
                    message: 'Bạn không có quyền truy cập tài nguyên này',
                });
            }
        });
    },

    verify_admin(req, res, next) {
        auth_middleware.verify_token(req, res, async () => {
            const isManager = await db.Manager.findByPk(req.token.id);
            if (isManager && isManager.Is_Admin) {
                next();
            } else {
                return res.status(403).json({
                    is_error: true,
                    message: 'Bạn không có quyền truy cập tài nguyên này',
                });
            }
        });
    },
};

export default auth_middleware;
