import { Request } from "express";
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams,
  Req,
  Res,
} from "routing-controllers";
import { GetUsersQuery } from "./types/GetUsersQueryParams";

@JsonController()
export class UserController {
  @Get("/users")
  getAllUsers(
    @Req() request: Request,
    @Res() response: any,
    @QueryParams() query: GetUsersQuery
  ) {
    if (query.limit) {
      return query.limit;
    }
    return { message: "This action returns all users", ip: request.ip };
  }

  @Get("/users/:id")
  getOne(@Param("id") id: number) {
    return "This action returns user #" + id;
  }

  @Post("/users")
  post(@Body() user: any) {
    return "Saving user...";
  }

  @Put("/users/:id")
  put(@Param("id") id: number, @Body() user: any) {
    return "Updating a user...";
  }

  @Delete("/users/:id")
  remove(@Param("id") id: number) {
    return "Removing user...";
  }
}
