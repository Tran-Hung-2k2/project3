import db from '../models/index.js';
import http_response from '../utils/http_response.js';

const parking_record_controller = {
    // [GET] api/parking_record/
    async get_all_parking_record(req, res) {
        try {
            const parking_records = await db.Parking_Record.findAll();
            return res
                .status(200)
                .json(http_response(false, 'Lấy danh sách thông tin gửi xe thành công', parking_records));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Lấy danh sách thông tin gửi xe thất bại'));
        }
    },

    // [POST] api/parking_record/
    async add_parking_record(req, res) {
        try {
            const { Parking_ID, Card_ID, Record_Image, Action } = req.body;
            if ((Parking_ID, Card_ID, Record_Image, Action))
                return res.status(400).json(http_response(true, 'Thiếu các trường bắt buộc'));

            const parking_record = await db.Parking_Record.create({
                Parking_ID,
                Card_ID,
                Record_Image,
                Action,
            });

            return res.status(201).json(http_response(false, 'Thêm thông tin gửi xe mới thành công', parking_record));
        } catch (error) {
            return res.status(500).json(http_response(true, 'Thêm thông tin gửi xe mới thất bại'));
        }
    },
};

export default parking_record_controller;
