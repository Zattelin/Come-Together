module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    todo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    dueDate: {
      type: DataTypes.DATE
    }
  });
  return Todo;
};
