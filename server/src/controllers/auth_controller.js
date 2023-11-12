import bcrypt from 'bcrypt';
import email_validator from 'email-validator';
import db from '../models/index.js';
import http_response from '../utils/http_response.js';
import token from '../utils/token.js';
import hash_password from '../utils/hash_password.js';

const auth_controller = {
    // [POST] /api/auth/user/register/
    async user_register(req, res) {
        try {
            const { User_Name, Email, User_Password, Gender, Birthday, Phone_Number, Address, Avatar } = req.body;

            if (!User_Name || !Email || !User_Password) {
                return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));
            }

            if (!email_validator.validate(Email)) {
                return res.status(400).json(http_response(true, 'Email không hợp lệ'));
            }

            const isUser = await db.User.findOne({ where: { Email } });
            if (isUser) {
                return res.status(400).json(http_response(true, 'Email đã được đăng ký trước đó'));
            }

            const user = await db.User.create({
                User_Name,
                Email,
                User_Password: await hash_password(User_Password),
                Gender,
                Birthday,
                Phone_Number,
                Address,
                Avatar,
            });

            return res.status(201).json(http_response(false, 'Đăng ký thành công', user));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Đăng ký thất bại'));
        }
    },

    // [POST] /api/auth/user/login/
    async user_login(req, res) {
        try {
            const { Email, User_Password } = req.body;
            if (!Email || !User_Password) {
                return res.status(400).json({
                    is_error: true,
                    message: 'Thiếu các trường bắt buộc',
                });
            }

            const user = await db.User.findOne({
                where: { Email },
            });

            if (!user || !(await bcrypt.compare(User_Password, user.User_Password))) {
                return res.status(401).json(http_response(true, 'Email hoặc mật khẩu không chính xác'));
            }

            const access_token = token.generate_access_token(user.User_ID);
            res.cookie('access_token', access_token, {
                httpOnly: true,
            });

            const refresh_token = token.generate_refresh_token(user.User_ID);
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
            });

            return res.status(200).json(http_response(false, 'Đăng nhập thành công', user));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Đăng nhập thất bại'));
        }
    },

    // [POST] /api/auth/manager/login/
    async manager_login(req, res) {
        try {
            const { Email, Manager_Password } = req.body;
            if (!Email || !Manager_Password) {
                return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));
            }

            const manager = await db.Manager.findOne({
                where: { Email },
            });

            if (!manager || !(await bcrypt.compare(Manager_Password, manager.Manager_Password))) {
                return res.status(401).json(http_response(true, 'Email hoặc mật khẩu không chính xác'));
            }

            const access_token = token.generate_access_token(manager.Manager_Password);
            res.cookie('access_token', access_token, {
                httpOnly: true,
            });

            const refresh_token = token.generate_refresh_token(manager.Manager_Password);
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
            });

            return res.status(200).json(http_response(false, 'Đăng nhập thành công', manager));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Đăng nhập thất bại'));
        }
    },

    // [POST] /api/auth/refresh_token/
    async refresh_token(req, res) {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) return res.status(401).json(http_response(true, 'Vui lòng đăng nhập để tiếp tục'));

        jwt.verify(refresh_token, process.env.JWT_REFRESH_KEY, (err, token) => {
            if (err) {
                return res.status(403).json(http_response(true, 'Token đã hết hạn hoặc không chính xác'));
            }
            const access_token = token.generate_access_token(token.id);
            res.cookie('access_token', access_token, {
                httpOnly: true,
            });
            return res.status(200).json(http_response(false, 'Làm mới access token thành công'));
        });
    },

    // [POST] /api/auth/logout/
    async logout(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).json(http_response(false, 'Đăng xuất thành công'));
    },
};

export default auth_controller;
