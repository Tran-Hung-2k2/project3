import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';
import APIError from '../utils/api_error.js';
import label from '../constants/label.js';

const controller = {
    // [GET] api/parking_record/
    get_all_parking_record: async_wrap(async (req, res) => {
        let data;
        if (req.token.role == label.role.ADMIN) {
            data = await db.Parking_Record.findAll({
                include: [
                    {
                        model: db.Parking_Card,
                        include: {
                            model: db.User,
                            attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                        },
                    },
                    {
                        model: db.Parking,
                    },
                ],
            });
        } else if (req.token.role == label.role.MANAGER) {
            if (!req.query?.Parking_ID) throw new APIError('400', 'Bạn chưa cung cấp ID của bãi đỗ xe');

            const parking_manager = await db.Parking_Manager.findOne({
                where: { Parking_ID: req.query.Parking_ID, User_ID: req.token.id },
            });
            if (!parking_manager)
                throw new APIError('403', 'Bạn không có quyền xem thông tin vào ra của bãi đỗ xe này');
            else {
                data = await db.Parking_Record.findAll({
                    include: [
                        {
                            model: db.Parking_Card,
                        },
                        {
                            model: db.Parking,
                            where: {
                                Parking_ID: req.query.Parking_ID,
                            },
                        },
                    ],
                });
            }
        } else {
            data = await db.Parking_Record.findAll({
                include: [
                    {
                        model: db.Parking_Card,
                        where: {
                            User_ID: req.token.id,
                        },
                        include: {
                            model: db.User,
                            attributes: ['User_ID', 'Name', 'Avatar', 'Email', 'Role'],
                        },
                    },
                    {
                        model: db.Parking,
                    },
                ],
            });
        }
        return res.status(200).json(api_response(false, 'Lấy danh sách thông tin gửi xe thành công', data));
    }),

    // [POST] api/parking_record/
    add_parking_record: async_wrap(async (req, res) => {
        const parking_record = await db.Parking_Record.create(req.body);

        return res.status(201).json(api_response(false, 'Thêm thông tin gửi xe mới thành công', parking_record));
    }),
};

export default controller;
