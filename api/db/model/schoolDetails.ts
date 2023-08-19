import { DataTypes, Model, Sequelize } from "sequelize";

// Define the Sequelize model
interface SchoolDetailsAttributes {
  name: string;
  address: string;
  phone_number: number;
  email: string;
  logo_small?: string;
  logo_long?: string;
  created_by: string;
  access_code: string;
  created_at: Date;
}

class SchoolDetailsModel
  extends Model<SchoolDetailsAttributes>
  implements SchoolDetailsAttributes
{
  public name!: string;
  public address!: string;
  public phone_number!: number;
  public email!: string;
  public logo_small?: string;
  public logo_long?: string;
  public created_by!: string;
  public access_code!: string;
  public created_at!: Date;
}

// Initialize the model
export default (sequelize: Sequelize) => {
  SchoolDetailsModel.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1000000000, // Minimum length of 10 digits
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      logo_small: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      logo_long: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      access_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "SchoolDetails",
    }
  );

  return SchoolDetailsModel;
};
