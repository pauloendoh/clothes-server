import { config } from "dotenv";
import { BadRequestError } from "routing-controllers";
import { urls } from "../../utils/urls";
import { ClothingRepository } from "./ClothingRepository";
config();

export class ClothingService {
  constructor(private clothingRepo = new ClothingRepository()) {}

  async findUserClothings(userId: number) {
    return this.clothingRepo.findUserClothings(userId);
  }

  createClothing = async (userId: number, imgUrl: string) => {
    if (!imgUrl.includes("http")) {
      imgUrl = urls.publicUploads(imgUrl);
    }

    return this.clothingRepo.createClothing(userId, imgUrl);
  };

  async deleteClothing(userId: number, clothingId: number) {
    const deleteResult = await this.clothingRepo.deleteClothing(
      userId,
      clothingId
    );
    if (deleteResult.count === 0)
      throw new BadRequestError(
        "Clothing not found or user does not have access."
      );

    return deleteResult;
  }
}
