import { Model, ModelStatic } from "sequelize";

interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export default class AssociableModel<
  Attributes = {},
  CreationAttributes = Attributes
> extends Model<Attributes & Timestamps, CreationAttributes & Timestamps> {
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(values?: Attributes & Timestamps, options?: any) {
    super(values, options);

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  static associate: (models: {
    [key: string]: ModelStatic<Model<any, any>>;
  }) => void;
}
