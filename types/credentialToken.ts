export type ICredentialToken = {
    id: number;
    uuid: string;
    isActive: boolean;
    createdAt?: Date;
    userEmail?: string;
};
