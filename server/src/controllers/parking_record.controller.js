import db from '../models/index.js';
import api_response from '../utils/api_response.js';
import async_wrap from '../utils/async_wrap.js';

const controller = {
    // [GET] api/parking_record/
    get_all_parking_record: async_wrap(async (req, res) => {
        const parking_records = await db.Parking_Record.findAll();
        return res.status(200).json(api_response(false, 'Lấy danh sách thông tin gửi xe thành công', parking_records));
    }),

    // [POST] api/parking_record/
    add_parking_record: async_wrap(async (req, res) => {
        const parking_record = await db.Parking_Record.create(req.body);

        return res.status(201).json(api_response(false, 'Thêm thông tin gửi xe mới thành công', parking_record));
    }),
};

export default controller;
