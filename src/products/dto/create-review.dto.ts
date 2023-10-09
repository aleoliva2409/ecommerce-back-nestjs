import { IsString, Length, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1.0)
  @Max(5.0)
  score: number;
}
