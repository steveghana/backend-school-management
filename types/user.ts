export type IUser = {
    email: string;
    password?: string;
    lockReason?: 'needs review';
    fullName?: string;
    address?:string;
};
