import { DataTypes, Model, Sequelize } from "sequelize";

// Define the Sequelize model
interface SchoolDetailsAttributes {
  name: string;
  // address: string;
  phone_number: number;
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
}

class StaffDetails
  extends Model<SchoolDetailsAttributes>
  implements SchoolDetailsAttributes
{
  public name!: string;
  // public address!: string;
  public phone_number!: number;
  public email!: string;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
}

// Initialize the model
export default (sequelize: Sequelize) => {
  StaffDetails.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
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
    },
    {
      sequelize,
      modelName: "SchoolDetails",
    }
  );
  //  StaffDetails.hasMany(class, { onDelete: 'CASCADE' });
  // StaffDetails.hasMany(class , { onDelete: 'CASCADE' });
  return StaffDetails;
};
