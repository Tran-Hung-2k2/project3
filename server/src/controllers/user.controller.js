import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import firebase_service from '../services/firebase.service.js';
import APIError from '../utils/api_error.js';
import label from '../constants/label.js';

const controller = {
    // [GET] api/user/
    get_all_users: async_wrap(async (req, res) => {
        const queryParams = ['User_ID', 'Email', 'Name', 'Role', 'Status'];
        const whereClause = {};

        queryParams.forEach((param) => {
            if (req.query[param]) {
                whereClause[param] = req.query[param];
            }
        });

        const users = await db.User.findAll({
            where: whereClause,
            attributes: ['User_ID', 'Name', 'Email', 'Avatar', 'Status', 'Role', 'createdAt', 'updatedAt'],
        });

        if (users.length > 0)
            return res.status(200).json(api_response(false, 'Lấy danh sách người dùng thành công', users));
        else return res.status(200).json(api_response(false, 'Không tìm thấy người dùng nào', users));
    }),

    // [GET] /api/user/detail
    get_user_info: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.token.id, {
            attributes: ['User_ID', 'Name', 'Email', 'Avatar', 'Status', 'Role'],
        });

        if (!user) throw new APIError(404, 'Người dùng không tồn tại');

        return res.status(200).json(api_response(false, 'Lấy thông tin tài khoản thành công', user));
    }),

    // [PATCH] /api/user/:id
    update_user: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.params.id);
        if (!user) throw new APIError(404, 'Người dùng không tồn tại');

        user.Status = req.body.Status || user.Status;

        await user.save();

        return res.status(200).json(api_response(false, 'Cập nhật thông tin người dùng thành công'));
    }),

    // [PATCH] /api/user/detail
    update_user_detail: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.token.id);

        user.Name = req.body.Name || user.Name;

        if (req.file) {
            if (user.Avatar) await firebase_service.delete_file(user.Avatar);
            const avatar = await firebase_service.upload_image(req.file.path);
            user.Avatar = avatar;
        }

        await user.save();

        user.Password = null;

        return res.status(200).json(api_response(false, 'Cập nhật thông tin tài khoản thành công', user));
    }),

    // [DELETE] /api/user/:id
    delete_user: async_wrap(async (req, res) => {
        const user = await db.User.findByPk(req.params.id);

        if (!user) throw new APIError(404, 'Người dùng không tồn tại');
        if (user.Role == label.role.ADMIN) throw new APIError(400, 'Bạn không thể xóa tài khoản admin');

        if (user.Avatar) await firebase_service.delete_file(user.Avatar);
        await db.User.destroy({
            where: { User_ID: req.params.id },
        });

        return res.status(200).json(api_response(false, 'Xóa người dùng thành công'));
    }),
};

export default controller;
