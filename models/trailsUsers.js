// user model declaration
'use strict';

module.exports = function(sequelize, DataTypes) {
    const trailsUsers = sequelize.define('trailsUsers', {
        userId: {
            type: DataTypes.INTEGER
        },
        trailId: {
            type: DataTypes.INTEGER
        },
        rank: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        }
    })
    
    return trailsUsers
}