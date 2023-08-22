import { DataTypes, Model, Sequelize } from "sequelize";

// Define interface for the model attributes
interface ClassAttributes {
  className: string;
  created_by: string;
}

// Define the Sequelize model
class ClassModel extends Model<ClassAttributes> implements ClassAttributes {
  public className!: string;
  public created_by!: string;
}

// Initialize the model
export default (sequelize: Sequelize) => {
  ClassModel.init(
    {
      className: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "ClassModel", // Adjust the model name
    }
  );

  // Define associations here if needed

  return ClassModel;
};
