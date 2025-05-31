export enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export interface UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  phoneNumber: number;
  address: string;
  district: string;
  imagePath: string;
}