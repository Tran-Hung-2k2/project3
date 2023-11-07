'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Parking_Record', {
            Record_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            Parking_ID: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Parking',
                    key: 'Parking_ID',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Card_ID: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'Parking_Card',
                    key: 'Card_ID',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            Record_Image: {
                type: Sequelize.STRING,
            },
            Action: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('Parking_Record');
    },
};
