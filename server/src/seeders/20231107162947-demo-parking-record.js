'use strict';
const label = require('../constants/label');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const parkingRecordData = [
            {
                Record_ID: 'a1234567-89ab-4cde-8srh-123456789012',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Card_ID: 'c3456789-abcd-4efg-f515-456789012345',
                Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKQBnRyS1zr50if3iwWZ2HvHzPpMJKp_dc_A&usqp=CAU',
                Action: label.action.GO_IN,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Record_ID: 'd4567890-bcde-4twe-1234-567890123456',
                Parking_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Card_ID: 'c3456789-abcd-4efg-f515-456789012345',
                Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKQBnRyS1zr50if3iwWZ2HvHzPpMJKp_dc_A&usqp=CAU',
                Action: label.action.GO_OUT,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Parking_Records', parkingRecordData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Parking_Records', null, {});
    },
};
