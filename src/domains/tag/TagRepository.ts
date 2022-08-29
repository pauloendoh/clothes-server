import { myPrismaClient } from "../../utils/myPrismaClient";

export class TagRepository {
  constructor(private prismaClient = myPrismaClient) {}

  findTagsByUserId(userId: number) {
    return this.prismaClient.tag.findMany({
      where: {
        userId,
      },
    });
  }

  createTag(userId: number, tagName: string) {
    return this.prismaClient.tag.create({
      data: {
        name: tagName,
        userId,
      },
    });
  }
}
