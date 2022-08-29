import { myPrismaClient } from "../../utils/myPrismaClient";
import { ClothingPutDto } from "./types/ClothingPutDto";

export class ClothingRepository {
  constructor(private prismaClient = myPrismaClient) {}

  async findUserClothings(userId: number) {
    return this.prismaClient.clothing.findMany({
      where: {
        userId,
      },
    });
  }

  async findClothing(clothingId: number) {
    return this.prismaClient.clothing.findUnique({
      where: {
        id: clothingId,
      },
    });
  }

  async createClothing(userId: number, imgUrl: string) {
    return this.prismaClient.clothing.create({
      data: {
        userId,
        imgUrl,
        minDegree: 0,
        maxDegree: 30,
      },
    });
  }

  async clothingBelongsToUser(clothingId: number, userId: number) {
    const found = await this.prismaClient.clothing.findFirst({
      where: {
        id: clothingId,
        userId,
      },
    });

    return !!found;
  }

  async updateClothing(clothingId: number, clothing: ClothingPutDto) {
    const { ...data } = clothing;

    return this.prismaClient.clothing.update({
      where: {
        id: clothingId,
      },
      data: {
        ...data,
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
