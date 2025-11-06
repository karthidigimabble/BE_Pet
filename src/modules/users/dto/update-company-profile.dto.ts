// src/modules/users/dto/update-company-profile.dto.ts
import {
  IsString,
  IsOptional,
  IsEmail,
  ValidateNested,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCompanyProfileDto {
  @IsString()
  company_name: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  mobile_no?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  tax_id?: string;
}
