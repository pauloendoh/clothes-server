import { User } from "@prisma/client";
import {
  Body,
  CurrentUser,
  Get,
  JsonController,
  Post,
} from "routing-controllers";
import { TagService } from "./TagService";
import { TagPostDto } from "./types/TagPostDto";

@JsonController("/tags")
export class TagController {
  constructor(private tagService = new TagService()) {}

  @Get()
  findTagsByUserId(@CurrentUser({ required: true }) user: User) {
    return this.tagService.findTagsByUserId(user.id);
  }

  @Post()
  createTag(
    @CurrentUser({ required: true }) user: User,
    @Body() body: TagPostDto
  ) {
    return this.tagService.createTag(user.id, body);
  }
}
