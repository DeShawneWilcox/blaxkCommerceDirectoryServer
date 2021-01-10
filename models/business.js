module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define('business', {
        businessOwner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        businessName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        zipcode: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        businessfuction: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Business;
}