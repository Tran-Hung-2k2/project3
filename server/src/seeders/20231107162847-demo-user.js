'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('user', salt);

        const userData = [
            {
                User_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                User_Name: 'Trần Việt Hùng',
                Email: 'tranviethung912002@gmail.com',
                User_Password: hashedPassword,
                Gender: 'Nam',
                Birthday: '2002-01-09',
                Phone_Number: '0983394837',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Users', userData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
