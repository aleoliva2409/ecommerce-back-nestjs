import { IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @Length(1, 25)
  name: string;

  @IsString()
  @Length(1, 25)
  lastName: string;

  @IsString()
  @Length(1, 20)
  phone: string;

  @IsString()
  @Length(1, 30)
  address1: string;

  @IsString()
  @Length(1, 30)
  @IsOptional()
  address2?: string = null;

  @IsString()
  @Length(1, 10)
  @IsOptional()
  floor?: string = null;

  @IsString()
  @Length(1, 25)
  city: string;

  @IsString()
  @Length(1, 15)
  zipCode: string;

  // @Column('')
  // country: Country;

  // @Column('')
  // user: User;
}
