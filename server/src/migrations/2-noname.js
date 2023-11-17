'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Number_Of_Vehicles" to table "Parkings"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2023-11-13T21:19:35.297Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "Parkings",
        "Number_Of_Vehicles",
        {
            "type": Sequelize.INTEGER.UNSIGNED,
            "field": "Number_Of_Vehicles",
            "defaultValue": 0
        }
    ]
}];

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
