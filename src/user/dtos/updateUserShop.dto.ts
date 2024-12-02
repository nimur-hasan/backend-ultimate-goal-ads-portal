import { IsNotEmpty } from 'class-validator';

export class updateUserShop {
  @IsNotEmpty()
  shopId: string;
}
