import { DataTypes, Model, Sequelize } from "sequelize";

interface IAttendance {
  firstName: string;
  Class: string;
  middleName?: string;
  loggedTime: string;
  lastName: string;
  date: string;
  actualLoggedtime: Date;
  role: string;
}

class ISTaffAttendance extends Model<IAttendance> implements IAttendance {
  public firstName!: string;
  public Class!: string;
  public loggedTime!: string;
  public lastName!: string;
  public date!: string;
  public role!: string;
  public actualLoggedtime!: Date;
}

export default (sequelize: Sequelize) => {
  ISTaffAttendance.init(
    {
      actualLoggedtime: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Class: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      loggedTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "StaffAttendance" }
  );
};
