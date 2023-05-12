import { EMailActions } from "../enums";

export const allTemplates: {
  [key: string]: { subject: string; templateName: string };
} = {
  [EMailActions.WELCOME]: {
    subject: "WELCOME",
    templateName: "register",
  },
  [EMailActions.FORGOT_PASSWORD]: {
    subject: "Forgot Password",
    templateName: "forgotPassword",
  },
};
