import { DataTypes, Model, Sequelize } from "sequelize";
interface IstaffPaymentDetails {
  bankBranch: string;
  bankName: string;
  payscale: string;
  Payscale: string;
  basicSalary: string;
  grossSalary: string;
  netSalary: string;
  Tier_Two_Deduction: string;
  contractType: string;
  SSNIT_Number: string;
}

class IStaffPayment
  extends Model<IstaffPaymentDetails>
  implements IstaffPaymentDetails
{
  public bankName!: string;
  public bankBranch!: string;
  public payscale!: string;
  public Payscale!: string;
  public basicSalary!: string;
  public grossSalary!: string;
  public netSalary!: string;
  public Tier_Two_Deduction!: string;
  public contractType!: string;
  public SSNIT_Number!: string;
}

export default (sequelize: Sequelize) => {
  IStaffPayment.init(
    {
      bankBranch: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      payscale: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Payscale: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      basicSalary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      grossSalary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      netSalary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Tier_Two_Deduction: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contractType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SSNIT_Number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, modelName: "StaffPaymentDetails" }
  );
  // StaffDetails.belongsTo(staffDetails , { onDelete: 'CASCADE' });

  return IStaffPayment;
};
