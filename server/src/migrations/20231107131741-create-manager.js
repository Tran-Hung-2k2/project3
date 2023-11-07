'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Manager', {
            Manager_ID: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4,
            },
            Manager_Name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            Manager_Password: {
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
            Is_Admin: {
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Manager');
    },
};
