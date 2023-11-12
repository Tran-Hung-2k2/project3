import db from '../models/index.js';
import http_response from '../utils/http_response.js';

const parking_controller = {
    // [GET] api/parking/
    async get_all_parking(req, res) {
        try {
            const parkings = await db.Parking.findAll();
            return res.status(200).json(http_response(false, 'Lấy danh sách bãi đỗ xe thành công', parkings));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Lấy danh sách bãi đỗ xe thất bại'));
        }
    },

    // [POST] api/parking/
    async add_parking(req, res) {
        try {
            const { Parking_Name, Address, Max_Space } = req.body;
            if (Parking_Name) return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));

            const parking = await db.Parking.create({
                Parking_Name,
                Address,
                Max_Space,
            });

            return res.status(201).json(http_response(false, 'Thêm bãi đỗ xe mới thành công', parking));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Thêm bãi đỗ xe mới thất bại'));
        }
    },

    // [PUT] api/parking/:id
    async update_parking(req, res) {
        try {
            const Parking_ID = req.params.id;
            const { Parking_Name, Address, Max_Space } = req.body;

            const updated_parking = {
                Parking_ID,
                Parking_Name,
                Address,
                Max_Space,
            };

            const result = await db.Parking.update(updated_parking, {
                where: { Parking_ID },
            });

            if (result[0] === 1) {
                return res.status(200).json(http_response(false, 'Cập nhật thông tin bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Cập nhật thông tin bãi đỗ xe thất bại'));
        }
    },

    // [DELETE] api/parking/:id
    async delete_parking(req, res) {
        try {
            const Parking_ID = req.params.id;

            const result = await db.Parking.destroy({
                where: { Parking_ID },
            });

            if (result === 1) {
                return res.status(200).json(http_response(false, 'Xóa bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Xóa bãi đỗ xe thất bại'));
        }
    },
};

export default parking_controller;
