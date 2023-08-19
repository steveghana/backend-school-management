import { IUser } from './user';

export type IAuthToken = {
    id: string;
    isActive: boolean;
    lastUsed: Date;
    createdAt?: Date;
    userEmail?: string;
    user?: IUser;
    credentialTokenId?: number;
};
