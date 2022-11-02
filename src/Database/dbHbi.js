
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = require('sequelize');

//models
const modelModules = require('../Models/Modules.js');
const modelUsers = require('../Models/Users.js');
const modelReport = require('../Models/Report.js');

const {
    HBI_USER,
    HBI_PASSWORD,
    HBI_NAME,
    HBI_PORT,
    HBI_CONNECTION,
    HBI_HOST,
} = process.env;


const sequelizeDBHBI = new Sequelize(`${process.env.HBI_NAME}`, `${process.env.HBI_USER}`, `${process.env.HBI_PASSWORD}`, {
    host: `${process.env.HBI_HOST}`,
    dialect: `${process.env.HBI_CONNECTION}`,
    logging: false,
    port: `${process.env.HBI_PORT}`,
});
modelModules(sequelizeDBHBI, sequelize.DataTypes);
modelUsers(sequelizeDBHBI, sequelize.DataTypes);
modelReport(sequelizeDBHBI, sequelize.DataTypes);
const {
    modules,
    users,
    report
} = sequelizeDBHBI.models

users.belongsToMany(modules, { through: report });
modules.belongsToMany(users, { through: report });
users.hasMany(report);

module.exports = {
    ...sequelizeDBHBI.models,
    dbHbi: sequelizeDBHBI,
} 