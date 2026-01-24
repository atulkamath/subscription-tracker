import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(28)
  renewalDay?: number;

  @IsOptional()
  @IsInt()
  @IsIn([0, 1, 2, 7])
  remindBeforeDays?: number;

  @IsOptional()
  @IsString()
  iconKey?: string;
}
