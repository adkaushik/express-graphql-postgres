module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('authToken', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: sequelize.literal('uuid_generate_v4()'),
    },
    authToken: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  })

  return AuthToken;
}
