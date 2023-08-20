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
  role: string;
  mothers_Name?: string;
  qualification: string;
  work_experience: string;
  Emergency_Contact_Name: string;
  emergency_Contact_Number: string;
  Next_of_Kin?: string;
  Next_of_Kin_Contact_Number?: string;
  Date_of_Birth: string;
  marital_Status: string;
  Date_of_Joining: string;
  Date_of_Leaving?: string;
  Local_Address: string;
  Permanent_Address?: string;
  Note?: string;
  Image?: string;
  Gender: string;
  fathers_Name?: string;
}

class StaffDetails
  extends Model<SchoolDetailsAttributes>
  implements SchoolDetailsAttributes
{
  public name!: string;
  public role!: string;
  public phone_number!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public fathers_Name!: string;
  public mothers_Name!: string;
  public qualification!: string;
  public work_experience!: string;
  public Emergency_Contact_Name!: string;
  public emergency_Contact_Number!: string;
  public Date_of_Birth!: string;
  public marital_Status!: string;
  public Date_of_Joining!: string;
  public Local_Address!: string;
  public Permanent_Address?: string;
  public Gender!: string;
  public updatedBy!: string;
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
      role: {
        type: DataTypes.STRING,
      },
      fathers_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mothers_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      work_experience: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },

      Emergency_Contact_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emergency_Contact_Number: {
        type: DataTypes.NUMBER,
        allowNull: true,

        validate: {
          min: 1000000000, // Minimum length of 10 digits
        },
      },
      Next_of_Kin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Next_of_Kin_Contact_Number: {
        type: DataTypes.NUMBER,
        allowNull: true,

        validate: {
          min: 1000000000,
        },
      },
      Date_of_Birth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      marital_Status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Date_of_Joining: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Date_of_Leaving: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Local_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Permanent_Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StaffDetails",
    }
  );
  //  StaffDetails.hasMany(class, { onDelete: 'CASCADE' });
  // StaffDetails.hasMany(staffPaymentDetails , { onDelete: 'CASCADE' });
  return StaffDetails;
};
