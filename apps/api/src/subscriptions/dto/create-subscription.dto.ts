import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsString()
  name!: string;

  @IsNumber()
  @Min(0.01)
  price!: number;

  @IsInt()
  @Min(1)
  @Max(31)
  renewalDay!: number;

  @IsOptional()
  @IsString()
  iconKey?: string;
}
