'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Manager extends Model {
        /**
         * Phương thức hỗ trợ để định nghĩa các mối quan hệ.
         * Phương thức này không thuộc về vòng đời Sequelize.
         * Tệp `models/index` sẽ tự động gọi phương thức này.
         */
        static associate(models) {
            Manager.belongsToMany(models.Parking, {
                through: 'Parking_Manager',
                foreignKey: 'Manager_ID',
            });
        }
    }

    Manager.init(
        {
            Manager_ID: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            Manager_Name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Manager_Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Gender: DataTypes.STRING,
            Birthday: DataTypes.DATEONLY,
            Phone_Number: DataTypes.STRING,
            Address: DataTypes.STRING,
            Avatar: DataTypes.STRING,
            Is_Admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'Manager',
        },
    );
    return Manager;
};
