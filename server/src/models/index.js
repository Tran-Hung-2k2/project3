'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Lấy tên tệp hiện tại (dùng để loại bỏ nó sau này)
const basename = path.basename(__filename);

// Import cấu hình cơ sở dữ liệu tương ứng với env từ tệp JSON
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/config.json')[env];

// Tạo đối tượng db để chứa các model và các đối tượng Sequelize
const db = {};

let sequelize;

// Kiểm tra xem cần sử dụng biến môi trường để kết nối cơ sở dữ liệu hay không
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    // Tạo một kết nối mới bằng cách sử dụng thông tin từ cấu hình
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc danh sách các tệp trong thư mục hiện tại
fs.readdirSync(__dirname)
    .filter((file) => {
        // Lọc ra các tệp có phần mở rộng .js và không phải là tệp hiện tại (basename)
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js' && file.indexOf('.test.js') === -1
        );
    })
    .forEach((file) => {
        // Import và khởi tạo model từ các tệp .js
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Kết nối các model nếu chúng có phương thức associate
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Gắn đối tượng sequelize và Sequelize vào db để có thể sử dụng trong ứng dụng khác
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Xuất đối tượng db để sử dụng ở nơi khác trong ứng dụng
module.exports = db;
