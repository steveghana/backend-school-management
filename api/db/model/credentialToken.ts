import { DataTypes, Sequelize, Optional } from 'sequelize';
import AssociableModel from '../associable';
import { ICredentialToken } from '../../../types/credentialToken';

class credentialToken
    extends AssociableModel<ICredentialToken, Optional<ICredentialToken, 'id' | 'uuid' | 'isActive'>>
    implements ICredentialToken
{
    public id!: number;
    public uuid: string;
    public isActive: boolean;
    public userEmail: string;
}

export default (sequelize: Sequelize): typeof credentialToken => {
    credentialToken.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                unique: true,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            modelName: 'credentialToken',
            sequelize,
        }
    );

    credentialToken.associate = models => {
        credentialToken.belongsTo(models.user, { onDelete: 'CASCADE' });
        credentialToken.hasMany(models.authToken, { onDelete: 'CASCADE' });
    };

    return credentialToken;
};
