'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('User', {
            User_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            User_Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            User_Password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Gender: {
                type: Sequelize.STRING,
            },
            Birthday: {
                type: Sequelize.DATEONLY,
            },
            Phone_Number: {
                type: Sequelize.STRING,
            },
            Address: {
                type: Sequelize.STRING,
            },
            Avatar: {
                type: Sequelize.STRING,
            },
            Balance: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('User');
    },
};