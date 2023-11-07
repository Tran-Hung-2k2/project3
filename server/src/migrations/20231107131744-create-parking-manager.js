'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Parking_Manager', {
            Manager_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                references: {
                    model: 'Manager',
                    key: 'Manager_ID',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Parking_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                references: {
                    model: 'Parking',
                    key: 'Parking_ID',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Is_Managing: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.dropTable('Parking_Manager');
    },
};
