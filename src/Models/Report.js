module.exports = (sequelize, DataTypes) => {
    return sequelize.define('report', {
        idReport: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: { type: DataTypes.DATE, allowNull: false },
        result: { type: DataTypes.STRING, allowNull: false },
    });
}