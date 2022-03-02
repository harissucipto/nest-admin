import { IsEmail, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  role_id?: number;
}
