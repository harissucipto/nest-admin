import { IsNotEmpty, IsOptional } from 'class-validator';
export class ProductUpdateDto {
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  image?: string;

  @IsOptional()
  @IsNotEmpty()
  price?: number;
}
