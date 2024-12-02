export class UpdateUserOtpDto {
  otp: {
    code: number;
    exp: Date;
  };
}
