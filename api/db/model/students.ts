import { DataTypes, Model, Sequelize } from "sequelize";

interface IStudents {
  admission_date: string;
  firstName: string;
  middlename?: string;
  lastName: string;
  image: string;
  region: string;
  city: string;
  town: string;
  religion?: string;
  gender: string;
  localAddress: string;
  permanent_address: string;
  class: string;
  section?: string;
  school_club?: string;
  blood_group?: string;
  medical_condition?: string;
  guardian: string;
  father_name: string;
  father_phone: string;
  father_occupation: string;
  mother_name: string;
  mother_phone: string;
  mother_occupation: string;
  guardian_name: string;
  guardian_relation: string;
  guardian_phone: string;
  guardian_occupation: string;
  guardian_address: string;
  guardian_email: string;
  father_pic?: string;
  mother_pic?: string;
  guardian_pic?: string;
  previous_school?: string;
  height?: string;
  weight?: string;
  updated_By: string;
  Bus_Fees?: string;
  Fee_updated_by?: string;
  created_by?: string;
}

class IStudent extends Model<IStudents> implements IStudents {
  public admission_date!: string;
  public firstName!: string;
  public lastName!: string;
  public image!: string;
  public region!: string;
  public city!: string;
  public town!: string;
  public gender!: string;
  public localAddress!: string;
  public permanent_address!: string;
  public class!: string;
  public guardian!: string;
  public father_name!: string;
  public father_phone!: string;
  public father_occupation!: string;
  public mother_name!: string;
  public mother_phone!: string;
  public mother_occupation!: string;
  public guardian_name!: string;
  public guardian_relation!: string;
  public guardian_phone!: string;
  public guardian_occupation!: string;
  public guardian_address!: string;
  public guardian_email!: string;
  public updated_By!: string;
}

export default (sequelize: Sequelize) => {
  IStudent.init(
    {
      admission_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      town: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      localAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permanent_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      class: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      father_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      father_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      father_occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mother_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mother_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mother_occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_relation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_occupation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardian_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updated_By: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, modelName: "Students" }
  );
};
