'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const parkingManagerData = [
            {
                Manager_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Manager_ID: 'a1234567-89ab-4cde-8fgh-123456789123',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Is_Managing: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Managers', parkingManagerData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Managers', null, {});
    },
};
