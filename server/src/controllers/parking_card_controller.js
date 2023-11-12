import db from '../models/index.js';
import http_response from '../utils/http_response.js';

const parking_controller = {
    // [GET] api/parking_card/
    async get_all_parking_card(req, res) {
        try {
            const parking_cards = await db.Parking_Card.findAll();
            return res.status(200).json(http_response(false, 'Lấy danh sách thẻ gửi xe thành công', parking_cards));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Lấy danh sách thẻ gửi xe thất bại'));
        }
    },

    // [POST] api/parking_card/
    async add_parking_card(req, res) {
        try {
            const { User_ID } = req.body;
            if (User_ID) return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));

            const parking_card = await db.Parking_Card.create({
                User_ID,
            });

            return res.status(201).json(http_response(false, 'Thêm thẻ gửi xe mới thành công', parking_card));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Thêm thẻ gửi xe mới thất bại'));
        }
    },

    // [PUT] api/parking_card/:id
    async update_parking_card(req, res) {
        try {
            const Card_ID = req.params.id;
            const { User_ID, Is_Lock } = req.body;

            const updated_parking_card = {
                Card_ID,
                User_ID,
                Is_Lock,
            };

            const result = await db.Parking_Card.update(updated_parking_card, {
                where: { Card_ID },
            });

            if (result[0] === 1) {
                return res.status(200).json(http_response(false, 'Cập nhật thông tin thẻ gửi xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy thẻ gửi xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Cập nhật thông tin thẻ gửi xe thất bại'));
        }
    },

    // [DELETE] api/parking_card/:id
    async delete_parking_card(req, res) {
        try {
            const Card_ID = req.params.id;

            const result = await db.Parking_Card.destroy({
                where: { Card_ID },
            });

            if (result === 1) {
                return res.status(200).json(http_response(false, 'Xóa thẻ gửi xe thành công'));
            } else {
                return res.status(404).json(http_response(true, 'Không tìm thấy thẻ gửi xe'));
            }
        } catch (error) {
            return res.status(500).json(http_response(true, 'Xóa thẻ gửi xe thất bại'));
        }
    },
};

export default parking_controller;
