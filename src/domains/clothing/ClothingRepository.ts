import { myPrismaClient } from "../../utils/myPrismaClient";

export class ClothingRepository {
  constructor(private prismaClient = myPrismaClient) {}

  async findUserClothings(userId: number) {
    return this.prismaClient.clothing.findMany({
      where: {
        userId,
      },
    });
  }

  async createClothing(userId: number, imgUrl: string) {
    return this.prismaClient.clothing.create({
      data: {
        userId,
        imgUrl,
        minDegree: 24,
        maxDegree: 24,
      },
    });
  }

  async deleteClothing(userId: number, clothingId: number) {
    return this.prismaClient.clothing.deleteMany({
      where: {
        userId,
        id: clothingId,
      },
    });
  }
}
