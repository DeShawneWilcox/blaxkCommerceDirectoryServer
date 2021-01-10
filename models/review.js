module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        entry: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Review;
}