module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    routeName: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    age: DataTypes.INTEGER,
    breed: DataTypes.STRING,
    species: DataTypes.STRING
  });

  return Pet;
};
