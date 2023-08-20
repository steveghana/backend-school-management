import { DataTypes, Model, Sequelize } from "sequelize";

interface ISocials {
  Facebook: string;
  Twitter: string;
  LinkedIn: string;
  Instagram: string;
}

class Socials extends Model<ISocials> implements ISocials {
  public Facebook!: string;
  public Twitter!: string;
  public LinkedIn!: string;
  public Instagram!: string;
}

export default (sequelize: Sequelize) => {
  Socials.init(
    {
      Facebook: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Twitter: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      LinkedIn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Instagram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, modelName: "Socials" }
  );
  return Socials;
};
