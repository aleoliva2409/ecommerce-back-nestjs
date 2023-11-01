import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(4, 50)
  fullName?: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
}
