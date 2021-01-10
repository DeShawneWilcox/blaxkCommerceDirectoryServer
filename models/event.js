module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('event', {
        eventName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    return Event;
}