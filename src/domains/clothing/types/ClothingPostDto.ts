import { IsNumber, IsString } from "class-validator";
import {} from "routing-controllers-openapi";
export class ClothingPostDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}
