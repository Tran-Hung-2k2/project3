import db from '../models/index.js';
import http_response from '../utils/http_response.js';

const parking_manager_controller = {
    // [GET] api/parking_manager/
    async get_all_parking_manager(req, res) {
        try {
            const parking_managers = await db.Parking_Manager.findAll();
            return res
                .status(200)
                .json(http_response(false, 'Lấy danh sách quản lý bãi đỗ xe thành công', parking_managers));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Lấy danh sách quản lý bãi đỗ xe thất bại'));
        }
    },

    // [POST] api/parking_manager/
    async add_parking_manager(req, res) {
        try {
            const { Manager_ID, Parking_ID } = req.body;
            if ((Manager_ID, Parking_ID)) return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));

            const parking_manager = await db.Parking_Manager.create({
                Manager_ID,
                Parking_ID,
            });

            return res.status(201).json(http_response(false, 'Thêm quản lý bãi đỗ xe mới thành công', parking_manager));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Thêm quản lý bãi đỗ xe mới thất bại'));
        }
    },

    // [PUT] api/parking_manager/:manager_id/:parking_id
    async update_parking_manager(req, res) {
        try {
            const Manager_ID = req.params.manager_id;
            const Parking_ID = req.params.parking_id;
            const { Is_Managing } = req.body;

            const updated_parking_manager = {
                Manager_ID,
                Parking_ID,
                Is_Managing,
            };

            const result = await db.Parking_Manager.update(updated_parking_manager, {
                where: { Manager_ID, Parking_ID },
            });

            if (result[0] === 1) {
                return res.status(200).json(http_response(false, 'Cập nhật thông tin quản lý bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy quản lý bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Cập nhật thông tin quản lý bãi đỗ xe thất bại'));
        }
    },

    // [DELETE] api/parking_manager/:manager_id/:parking_id
    async delete_parking_manager(req, res) {
        try {
            const Manager_ID = req.params.manager_id;
            const Parking_ID = req.params.parking_id;

            const result = await db.Parking_Manager.destroy({
                where: { Manager_ID, Parking_ID },
            });

            if (result === 1) {
                return res.status(200).json(http_response(false, 'Xóa quản lý bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy quản lý bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Xóa quản lý bãi đỗ xe thất bại'));
        }
    },
};

export default parking_manager_controller;
