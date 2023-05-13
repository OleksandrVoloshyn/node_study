import { EActionTokenType, EMailActions, ESmsActionsEnum } from "../enums";
import { ApiError } from "../errors";
import { Action, Token, User } from "../models";
import { ICredentials, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { smsService } from "./sms.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const { password } = body;
      const hashedPassword = await passwordService.hash(password);

      await User.create({ ...body, password: hashedPassword });

      await Promise.all([
        await smsService.sendSms(body.phone, ESmsActionsEnum.WELCOME),
        await emailService.sendMail(body.email, EMailActions.WELCOME),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) throw new ApiError("Invalid Email or password", 400);

      const tokenPair = tokenService.generateTokenPair({
        name: user.name,
        _id: user._id,
      });

      await Token.create({
        _user_id: user._id,
        ...tokenPair,
      });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });

      await Promise.all([
        Token.create({ _user_id: jwtPayload._id, ...tokenPair }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await User.findById(userId);

    const isMatched = await passwordService.compare(oldPassword, user.password);
    if (!isMatched) throw new ApiError("Wrong old password", 400);

    const hashedNewPassword = await passwordService.hash(newPassword);
    await User.updateOne({ _id: user._id }, { password: hashedNewPassword });
  }

  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionTokenType.forgot
      );
      await Action.create({
        actionToken,
        tokenType: EActionTokenType.forgot,
        _user_id: user._id,
      });

      await emailService.sendMail(user.email, EMailActions.FORGOT_PASSWORD, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async setForgotPassword(password: string, id: string): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
