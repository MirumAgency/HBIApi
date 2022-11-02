module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        idLearner: { type: DataTypes.STRING, allowNull: false },
        token: { type: DataTypes.STRING, allowNull: false },
    });
}

