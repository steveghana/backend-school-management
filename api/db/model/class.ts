import { DataTypes, Model, Sequelize } from "sequelize";

// Define interface for the model attributes
interface classAttributes {
  class: string;
  created_by: string;
}

// Define the Sequelize model
class classModel extends Model<classAttributes> implements classAttributes {
  public class!: string;
  public created_by!: string;
}

// Initialize the model
export default (sequelize: Sequelize): typeof classModel => {
  classModel.init(
    {
      class: {
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
      modelName: "class",
    }
  );
  // classModel.
  // classModel.belongsTo(models.user, { onDelete: 'CASCADE' });
  // classModel.belongsTo(models.credentialToken, { onDelete: 'CASCADE' });
  return classModel;
};
