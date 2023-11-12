'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Parking_Managers', {
            Manager_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
                references: {
                    model: 'Managers',
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
                    model: 'Parkings',
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
                defaultValue: Sequelize.literal('Now()'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('Now()'),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Parking_Managers');
    },
};
