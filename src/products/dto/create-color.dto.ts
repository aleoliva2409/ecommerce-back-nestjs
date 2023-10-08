import { IsString, Length } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @Length(4, 30)
  name: string;

  @IsString()
  @Length(4, 7)
  code: string;
}
