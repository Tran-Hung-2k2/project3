'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Parking_Cards', {
            Card_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            User_ID: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'User_ID',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Is_Lock: {
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
        await queryInterface.dropTable('Parking_Cards');
    },
};
