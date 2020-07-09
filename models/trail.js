'use strict';

module.exports = function (sequelize, DataTypes) {
    const trail = sequelize.define('trail', {
        name: {
            type: DataTypes.STRING
        },
        location: {
            type: DataTypes.STRING
        },
        length: {
            type: DataTypes.FLOAT
        },
        conditions: {
            type: DataTypes.STRING
        },
        conditionsDate: {
            type: DataTypes.STRING
        },
        trailCode: {
            type: DataTypes.STRING
        }
    },{})
    trail.associate = function (models) {
        models.trail.belongsToMany(models.user, { through: 'trailsUsers' })
    }

    return trail
};
