export enum EGenders {
  male = "male",
  female = "female",
}

export interface IUser {
  email: string;
  password: string;
  gender: string;
}
