'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Managers", deps: []
 * createTable "Parkings", deps: []
 * createTable "Users", deps: []
 * createTable "Parking_Cards", deps: [Users]
 * createTable "Parking_Managers", deps: [Users, Parkings, Managers, Parkings]
 * createTable "Parking_Records", deps: [Parkings, Parking_Cards]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2023-11-13T17:28:37.801Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Managers",
            {
                "Manager_ID": {
                    "type": Sequelize.UUID,
                    "field": "Manager_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Manager_Name": {
                    "type": Sequelize.STRING,
                    "field": "Manager_Name",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true,
                    "allowNull": false
                },
                "Manager_Password": {
                    "type": Sequelize.STRING,
                    "field": "Manager_Password",
                    "allowNull": false
                },
                "Gender": {
                    "type": Sequelize.STRING,
                    "field": "Gender"
                },
                "Birthday": {
                    "type": Sequelize.DATEONLY,
                    "field": "Birthday"
                },
                "Phone_Number": {
                    "type": Sequelize.STRING,
                    "field": "Phone_Number"
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address"
                },
                "Avatar": {
                    "type": Sequelize.STRING,
                    "field": "Avatar"
                },
                "Is_Admin": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Is_Admin",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parkings",
            {
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "field": "Parking_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Parking_Name": {
                    "type": Sequelize.STRING,
                    "field": "Parking_Name",
                    "allowNull": false
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address"
                },
                "Max_Space": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Max_Space",
                    "defaultValue": 0
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "field": "User_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "User_Name": {
                    "type": Sequelize.STRING,
                    "field": "User_Name",
                    "allowNull": false
                },
                "Email": {
                    "type": Sequelize.STRING,
                    "field": "Email",
                    "unique": true,
                    "allowNull": false
                },
                "User_Password": {
                    "type": Sequelize.STRING,
                    "field": "User_Password",
                    "allowNull": false
                },
                "Gender": {
                    "type": Sequelize.STRING,
                    "field": "Gender"
                },
                "Birthday": {
                    "type": Sequelize.DATEONLY,
                    "field": "Birthday"
                },
                "Phone_Number": {
                    "type": Sequelize.STRING,
                    "field": "Phone_Number"
                },
                "Address": {
                    "type": Sequelize.STRING,
                    "field": "Address"
                },
                "Avatar": {
                    "type": Sequelize.STRING,
                    "field": "Avatar"
                },
                "Balance": {
                    "type": Sequelize.INTEGER.UNSIGNED,
                    "field": "Balance",
                    "defaultValue": 0
                },
                "Role": {
                    "type": Sequelize.STRING,
                    "field": "Role",
                    "defaultValue": "user",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Cards",
            {
                "Card_ID": {
                    "type": Sequelize.UUID,
                    "field": "Card_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "User_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "field": "User_ID",
                    "allowNull": false
                },
                "Is_Lock": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Is_Lock",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Managers",
            {
                "User_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "User_ID"
                    },
                    "unique": "Parking_Managers_User_ID_Parking_ID_unique",
                    "field": "User_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "unique": "Parking_Managers_User_ID_Parking_ID_unique",
                    "field": "Parking_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Is_Managing": {
                    "type": Sequelize.BOOLEAN,
                    "field": "Is_Managing",
                    "defaultValue": false,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "Manager_ID": {
                    "type": Sequelize.UUID,
                    "field": "Manager_ID",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Managers",
                        "key": "Manager_ID"
                    },
                    "unique": "Parking_Managers_Manager_ID_ParkingParkingID_unique"
                },
                "ParkingParkingID": {
                    "type": Sequelize.UUID,
                    "field": "ParkingParkingID",
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "unique": "Parking_Managers_Manager_ID_ParkingParkingID_unique"
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Parking_Records",
            {
                "Record_ID": {
                    "type": Sequelize.UUID,
                    "field": "Record_ID",
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV4
                },
                "Parking_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parkings",
                        "key": "Parking_ID"
                    },
                    "field": "Parking_ID",
                    "allowNull": false
                },
                "Card_ID": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Parking_Cards",
                        "key": "Card_ID"
                    },
                    "field": "Card_ID",
                    "allowNull": false
                },
                "Record_Image": {
                    "type": Sequelize.STRING,
                    "field": "Record_Image",
                    "defaultValue": false
                },
                "Action": {
                    "type": Sequelize.STRING,
                    "field": "Action",
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
