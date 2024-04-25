import { IsEmail, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

import { RoleType } from '@shared/enumerators';
import { IsDocument } from '@shared/validations/class-validator/IsDocument';
import { IsPassword } from '@shared/validations/class-validator/IsPassword';

export class CreateUserDTO {
  @IsUUID()
  @IsOptional()
  public id?: string;

  @IsString()
  public name: string;

  @IsString()
  @IsEmail()
  public email: string;

  @IsString()
  @IsDocument()
  public document: string;

  @IsString()
  @IsOptional()
  public birthDate?: string;

  @IsString()
  @IsOptional()
  public phone?: string;

  @IsString()
  public role: RoleType;

  @IsPassword()
  @IsString()
  @MinLength(6)
  public password: string;
}
