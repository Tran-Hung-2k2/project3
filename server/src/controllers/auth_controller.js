import bcrypt from 'bcrypt';
import db from '../models/index.js';
import token from '../utils/token.js';
import make_obj_data from '../utils/make_obj_data.js';
import hash_password from '../utils/hash_password.js';
import send_email from '../utils/send_email.js';
import generate_random_password from '../utils/generate_random_password.js';

const PORT = process.env.PORT || 8080;

const auth_controller = {
    // [POST] /api/auth/register/
    async register(req, res) {
        try {
            const { User_Name, Email, User_Password, Gender, Birthday, Phone_Number, Address } = req.body;

            const is_user = await db.User.findOne({ where: { Email } });
            if (is_user) {
                return res.status(400).json(make_obj_data(true, 'Email đã được đăng ký trước đó'));
            }

            const user = await db.User.create({
                User_Name,
                Email,
                User_Password: await hash_password(User_Password),
                Gender,
                Birthday,
                Phone_Number,
                Address,
            });

            return res.status(201).json(make_obj_data(false, 'Đăng ký thành công', user));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Đăng ký thất bại'));
        }
    },

    // [POST] /api/auth/login/
    async login(req, res) {
        try {
            const { Email, User_Password } = req.body;

            const user = await db.User.findOne({
                where: { Email },
            });

            if (!user || !(await bcrypt.compare(User_Password, user.User_Password))) {
                return res.status(401).json(make_obj_data(true, 'Email hoặc mật khẩu không chính xác'));
            }

            const access_token = token.generate_access_token(user.User_ID);
            res.cookie('access_token', access_token, {
                httpOnly: true,
            });

            const refresh_token = token.generate_refresh_token(user.User_ID);
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
            });

            console.log(user);

            return res.status(200).json(make_obj_data(false, 'Đăng nhập thành công', user));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Đăng nhập thất bại'));
        }
    },

    // [POST] /api/auth/change_password/
    async change_password(req, res) {
        try {
            const { Email, Old_Password, New_Password, Confirm_Password } = req.body;

            const user = await db.User.findOne({
                where: { Email },
            });

            if (!user || !(await bcrypt.compare(Old_Password, user.User_Password))) {
                return res.status(401).json(make_obj_data(true, 'Email hoặc mật khẩu không chính xác'));
            }

            if (New_Password != Confirm_Password) {
                return res.status(401).json(make_obj_data(true, 'Mật khẩu xác nhận không chính xác'));
            }

            // Đặt lại mật khẩu cho người dùng
            user.User_Password = await hash_password(New_Password);
            await user.save();
            return res.status(401).json(make_obj_data(true, 'Đổi mật khẩu thành công'));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Đổi mật khẩu thất bại'));
        }
    },

    // [POST] /api/auth/forget_password/
    async forget_password(req, res) {
        try {
            const { Email } = req.body;
            const isUser = await db.User.findOne({ where: { Email } });

            if (!isUser) {
                return res.status(400).json(make_obj_data(true, 'Email chưa được đăng ký tài khoản'));
            }

            // Tạo và lưu trữ token reset password
            const reset_pass_token = token.generate_reset_password_token(Email);

            // Gửi email xác nhận với link reset password
            const is_send = await send_email(
                Email,
                'Reset Password',
                `Click the following link to reset your password: http://127.0.0.1:${PORT}/api/auth/verify_forget_password?reset_pass_token=${reset_pass_token}`,
            );

            // Phản hồi thành công
            if (is_send)
                return res
                    .status(200)
                    .json(make_obj_data(false, 'Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư đến của bạn.'));
            else return res.status(500).json(make_obj_data(true, 'Gửi email thất bại vui lòng thử lại sau'));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Đặt lại mật khẩu thất bại'));
        }
    },

    // [GET] /api/auth/verify_forget_password/
    async verify_forget_password(req, res) {
        try {
            const { reset_pass_token } = req.query;

            // Xác minh token
            token.verify_token(reset_pass_token, process.env.JWT_RESET_PASSWORD_KEY, async (err, token_decode) => {
                if (err) {
                    return res.status(403).json(make_obj_data(true, 'Token đã hết hạn hoặc không chính xác'));
                }
                // Lấy thông tin người dùng từ token
                const { Email } = token_decode;

                // Tìm người dùng theo email
                const user = await db.User.findOne({ where: { Email } });

                if (!user) {
                    return res.status(404).json(make_obj_data(true, 'Người dùng không tồn tại'));
                }

                // Đặt lại mật khẩu cho người dùng
                const new_password = generate_random_password(6);
                user.User_Password = await hash_password(new_password);
                await user.save();

                // Gửi email xác nhận mật khẩu đã được thay đổi
                await send_email(
                    Email,
                    'Đặt lại mật khẩu thành công',
                    `Mật khẩu của bạn đã được đặt lại thành công. Mật khẩu mới của bạn là ${new_password}, vui lòng không chia sẻ mật khẩu với người khác.`,
                );

                // Phản hồi thành công
                return res
                    .status(200)
                    .json(
                        make_obj_data(
                            false,
                            'Mật khẩu đã được đặt lại thành công và được gửi về email của bạn. Vui lỏng kiểm tra hộp thư đến của bạn.',
                        ),
                    );
            });
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Xác nhận mật khẩu thất bại'));
        }
    },

    // [POST] /api/auth/refresh_token/
    async refresh_token(req, res) {
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token) return res.status(401).json(make_obj_data(true, 'Vui lòng đăng nhập để tiếp tục'));

        token.verify_token(refresh_token, process.env.JWT_REFRESH_KEY, (err, token_decode) => {
            if (err) {
                return res.status(403).json(make_obj_data(true, 'Token đã hết hạn hoặc không chính xác'));
            }
            const access_token = token.generate_access_token(token_decode.id);
            res.cookie('access_token', access_token, {
                httpOnly: true,
            });
            return res.status(200).json(make_obj_data(false, 'Làm mới access token thành công'));
        });
    },

    // [POST] /api/auth/logout/
    async logout(req, res) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        return res.status(200).json(make_obj_data(false, 'Đăng xuất thành công'));
    },
};

export default auth_controller;
