module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users",{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    // Associations
    Users.associate = (models) => {
    Users.hasMany(models.Posts,{
        onDelete: "CASCADE",
    });

    Users.hasMany(models.Likes,{
        onDelete: "CASCADE",
    })
    }

    
    return Users;
};