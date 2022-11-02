module.exports = (sequelize, DataTypes) => {
    return sequelize.define('modules', {
        idModule: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        code: { type: DataTypes.STRING, allowNull: false },
    });
}