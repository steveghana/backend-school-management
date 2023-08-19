import { Model, ModelStatic } from 'sequelize';

export default class AssociableModel<modelAttributes = any, creationAttributes = any> extends Model<
    modelAttributes,
    creationAttributes
> {
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    static associate: (models: { [key: string]: ModelStatic<Model<any, any>> }) => void;
}
