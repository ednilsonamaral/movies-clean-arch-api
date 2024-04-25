import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

import { IsDocument } from '@src/shared/validations/class-validator/IsDocument';

import { RoleType } from '@shared/enumerators';
import { IsPassword } from '@src/shared/validations/class-validator/IsPassword';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
    name?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
    email?: string;

  @IsString()
  @IsOptional()
  @IsDocument()
    document?: string;

  @IsString()
  @IsOptional()
    birthDate?: string;

  @IsString()
  @IsOptional()
    phone?: string;

  @IsString()
  @IsOptional()
    role?: RoleType;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @IsPassword()
    password?: string;
}
