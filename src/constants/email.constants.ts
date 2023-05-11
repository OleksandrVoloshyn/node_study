export enum EMailActions {
  // eslint-disable-next-line no-unused-vars
  WELCOME,
  // eslint-disable-next-line no-unused-vars
  FORGOT_PASSWORD,
}

export const allTemplates = {
  [EMailActions.WELCOME]: {
    subject: "WELCOME",
    templateName: "register",
  },
  [EMailActions.FORGOT_PASSWORD]: {
    subject: "Forgot Password",
    templateName: "forgotPassword",
  },
};
