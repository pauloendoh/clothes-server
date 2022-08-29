import { IsNumber, IsOptional, Max, Min } from "class-validator";

export class ClothingPutDto {
  @IsNumber()
  @IsOptional()
  tagId: number | null;

  @IsNumber()
  minDegree: number;

  @IsNumber()
  maxDegree: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating: number | null;
}
