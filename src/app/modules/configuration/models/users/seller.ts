export interface Seller {
    id: string;
    fullName: string;
    email: string;
    type: number;
    phoneNumber: number;
    photoUrl: string;
    accountNumber: number;
    accountHolder: number;
    iban: number;
    isBlocked: boolean;
    address: string;
    bank: string;
    role: string;
    isDeleted: boolean;
    createdAt: Date;
    vatNumber: number;
    isVerified: boolean;
    businessLicenseUrl:string;
}