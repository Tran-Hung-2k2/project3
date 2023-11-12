'use strict';
const bcrypt = require('bcrypt');
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const salt = await bcrypt.genSalt(10);
        const hashedAdminPassword = await bcrypt.hash('admin', salt);
        const hashedManagerPassword = await bcrypt.hash('manager', salt);

        const managerData = [
            {
                Manager_ID: 'a1234567-89ab-4cde-8fgh-123456789012',
                Manager_Name: 'Trần Việt Hùng',
                Email: 'tranviethung912002@gmail.com',
                Manager_Password: hashedAdminPassword,
                Gender: 'Nam',
                Birthday: '2002-01-09',
                Phone_Number: '0983394837',
                Address: 'Hà Nội',
                Avatar: 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
                Is_Admin: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                Manager_ID: 'a1234567-89ab-4cde-8fgh-123456789123',
                Manager_Name: 'Dương Ngọc Hải',
                Email: 'duongngochai@gmail.com',
                Manager_Password: hashedManagerPassword,
                Gender: 'Nam',
                Birthday: '2002-10-22',
                Phone_Number: '0396217089',
                Address: 'Hà Nội',
                Avatar: 'https://media.zenfs.com/en/variety.com/98dd77acddd034540682113391c0d902',
                Is_Admin: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await queryInterface.bulkInsert('Managers', managerData, {});

        return Promise.resolve();
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Managers', null, {});
    },
};
