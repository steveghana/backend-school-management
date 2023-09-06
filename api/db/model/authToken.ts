import { DataTypes, Sequelize, Optional, NOW, Model } from 'sequelize';
import AssociableModel from '../associable';
import { IAuthToken } from '../../../types/authToken';

class authToken
    extends Model <IAuthToken>
    implements IAuthToken
{
    public id!: string;
    public isActive!: boolean;
    public lastUsed!: Date;
    public userEmail!: string;
    public credentialTokenId!: number;
}

export default (sequelize: Sequelize): typeof authToken => {
    authToken.init(
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            lastUsed: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: NOW,
            },
        },
        {
            modelName: 'authToken',
            sequelize,
        }
    );

    // authToken.associate = models => {
        // authToken.belongsTo(models.user, { onDelete: 'CASCADE' });
        // authToken.belongsTo(models.credentialToken, { onDelete: 'CASCADE' });
    // };

    return authToken;
};
