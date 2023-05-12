import { Twilio } from "twilio";

import { configs } from "../configs";
import { smsTemplates } from "../constants";
import { ESmsActionsEnum } from "../enums";

class SmsService {
  constructor(
    // eslint-disable-next-line no-unused-vars
    private client = new Twilio(
      configs.TWILIO_ACCOUNT_SID,
      configs.TWILIO_AUTH_TOKEN
    )
  ) {}

  public async sendSms(phone: string, smsAction: ESmsActionsEnum) {
    try {
      const msg = smsTemplates[smsAction];

      await this.client.messages.create({
        body: msg,
        to: phone,
        messagingServiceSid: configs.TWILIO_SERVICE_SID,
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
    }
  }
}

export const smsService = new SmsService();
