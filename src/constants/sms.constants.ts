import { ESmsActionsEnum } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActionsEnum.WELCOME]: "Welcome",
  [ESmsActionsEnum.FORGOT_PASSWORD]: "Forgot Password",
};
