'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Parkings', {
            Parking_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            Parking_Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Address: {
                type: Sequelize.STRING,
            },
            Max_Space: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('Now()'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('Now()'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Parkings');
    },
};
