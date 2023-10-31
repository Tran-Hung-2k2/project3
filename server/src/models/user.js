'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Role, { foreignKey: 'ID_Role' });
            User.hasMany(models.Order, { foreignKey: 'ID_User' });
            User.belongsToMany(models.Product, {
                through: 'carts',
                foreignKey: 'ID_User',
            });
            User.belongsToMany(models.Voucher, {
                through: 'voucher_users',
                foreignKey: 'ID_User',
            });
            User.hasMany(models.Post, { foreignKey: 'ID_User' });
            User.hasMany(models.Comment, { foreignKey: 'ID_User' });
        }
    }
    User.init(
        {
            User_ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                allowNull: false,
                autoIncrement: true,
            },
            User_Name: {
                type: DataTypes.STRING(45),
                unique: true,
                allowNull: false,
            },
            User_Password: DataTypes.STRING(45),
            Gender: DataTypes.STRING(45),
            Birthday: DataTypes.Date,
            Email: DataTypes.STRING(45),
            Phone_Number: DataTypes.STRING(45),
            Address: DataTypes.STRING(45),
            Avatar: DataTypes.STRING(45),
            Balance: DataTypes.STRING(45),
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
