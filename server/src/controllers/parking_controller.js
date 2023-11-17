import db from '../models/index.js';
import make_obj_data from '../utils/make_obj_data.js';

const parking_controller = {
    // [GET] api/parking/
    async get_all_parking(req, res) {
        try {
            const parkings = await db.Parking.findAll();
            return res.status(200).json(make_obj_data(false, 'Lấy danh sách bãi đỗ xe thành công', parkings));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Lấy danh sách bãi đỗ xe thất bại'));
        }
    },

    // [POST] api/parking/
    async add_parking(req, res) {
        try {
            const { Parking_Name, Address, Max_Space } = req.body;

            const parking = await db.Parking.create({
                Parking_Name,
                Address,
                Max_Space,
            });

            await db.Parking_Manager.create({
                User_ID: req.token.id,
                Parking_ID: parking.Parking_ID,
            });

            return res.status(201).json(make_obj_data(false, 'Thêm bãi đỗ xe mới thành công', parking));
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Thêm bãi đỗ xe mới thất bại'));
        }
    },

    // [PATCH] api/parking/:id
    async update_parking(req, res) {
        try {
            const parking = await db.Parking.findByPk(req.params.id);
            if (!parking) return res.status(404).json(make_obj_data(true, 'Không tìm thấy bãi đỗ xe'));
            const { Parking_Name, Address, Max_Space, Number_Of_Vehicles } = req.body;

            parking.Parking_Name = Parking_Name;
            parking.Address = Address;
            parking.Number_Of_Vehicles = Number_Of_Vehicles;
            parking.Max_Space = Max_Space;
            await parking.save();

            return res.status(200).json(make_obj_data(false, 'Cập nhật thông tin bãi đỗ xe thành công'));
        } catch (error) {
            console.log(error);
            return res.status(500).json(make_obj_data(true, 'Cập nhật thông tin bãi đỗ xe thất bại'));
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
                return res.status(200).json(make_obj_data(false, 'Xóa bãi đỗ xe thành công'));
            } else {
                return res.status(404).json(make_obj_data(true, 'Không tìm thấy bãi đỗ xe'));
            }
        } catch (error) {
            return res.status(500).json(make_obj_data(true, 'Xóa bãi đỗ xe thất bại'));
        }
    },
};

export default parking_controller;
