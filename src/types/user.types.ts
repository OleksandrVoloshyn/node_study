import { Request } from "express";

export enum EGenders {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
}

export interface IRequestWithUser extends Request {
  user?: IUser;
}
