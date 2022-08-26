import { IsNumber, IsOptional } from "class-validator";

enum Roles {
  Admin = "admin",
  User = "user",
  Guest = "guest",
}

export class GetUsersQuery {
  @IsOptional()
  @IsNumber()
  limit: number;

  @IsOptional()
  city: string;

  @IsOptional()
  role: Roles;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  ids: number[];
}
