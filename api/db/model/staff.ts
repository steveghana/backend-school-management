import { DataTypes, Model, Sequelize } from "sequelize";

// Define the Sequelize model
interface SchoolDetailsAttributes {
  employeeId: string;
  phone_number: number;
  email: string;
  role?:string;
  firstName: string;
  middleName?: string;
  createdBy?:string;
  lastName: string;
  password:string;
  resetPasswordToken?:string;
  resetPasswordExpire?: Date;
}

class StaffDetails
  extends Model<SchoolDetailsAttributes>
  implements SchoolDetailsAttributes
{
  public employeeId!: string;
  public role?:string;
  public phone_number!: number;
  public email!: string;
  public firstName!: string;
  public middleName?: string;
  public lastName!: string;
  public password!:string;
}

// Initialize the model
export default (sequelize: Sequelize) => {
  StaffDetails.init(
    {
     
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      employeeId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: true,
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
