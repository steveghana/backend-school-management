import { DataTypes, Model, Sequelize } from "sequelize";

// Define interface for the model attributes
interface SectionAttributes {
  section: string;
  created_by: string;
  newSection: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
  oldSection: string | null;
}

// Define the Sequelize model
class SectionsModel
  extends Model<SectionAttributes>
  implements SectionAttributes
{
  public section!: string;
  public created_by!: string;
  public newSection!: string | null;
  public updatedBy!: string | null;
  public updatedAt!: string | null;
  public oldSection!: string | null;
}

// Initialize the model
export default (sequelize: Sequelize) => {
  SectionsModel.init(
    {
      section: {
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
      newSection: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      oldSection: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Sections",
    }
  );

  return SectionsModel;
};
