import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0.01)
  price!: number;

  @IsInt()
  @Min(1)
  @Max(28)
  renewalDay!: number;

  @IsInt()
  @IsIn([0, 1, 2, 7])
  remindBeforeDays!: number;

  @IsOptional()
  @IsString()
  iconKey?: string;
}
