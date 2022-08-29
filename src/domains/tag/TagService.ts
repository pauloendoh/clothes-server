import { JsonController } from "routing-controllers";
import { TagRepository } from "./TagRepository";
import { TagPostDto } from "./types/TagPostDto";

@JsonController("/clothing-tag")
export class TagService {
  constructor(private tagRepo = new TagRepository()) {}

  findTagsByUserId(userId: number) {
    return this.tagRepo.findTagsByUserId(userId);
  }

  createTag(userId: number, dto: TagPostDto) {
    return this.tagRepo.createTag(userId, dto.name);
  }
}
