import { unlink } from "fs";
import { BadRequestError, ForbiddenError } from "routing-controllers";
import { getPublicUploadsPath } from "../../utils/getPublicUploadsPath";
import { urls } from "../../utils/urls";
import { ClothingRepository } from "./ClothingRepository";
import { AwsFileDto } from "./types/AwsFileDto";
import { ClothingPutDto } from "./types/ClothingPutDto";
import { MulterFileDto } from "./types/MulterFileDto";

export class ClothingService {
  constructor(private clothingRepo = new ClothingRepository()) {}

  async findUserClothings(userId: number) {
    return this.clothingRepo.findUserClothings(userId);
  }

  createClothing = async (userId: number, file: MulterFileDto | AwsFileDto) => {
    let imgUrl = "";

    if ("location" in file) imgUrl = file.location;
    else if ("filename" in file) imgUrl = urls.publicUploads(file.filename);

    return this.clothingRepo.createClothing(userId, imgUrl);
  };

  async updateClothing(
    userId: number,
    clothingId: number,
    payload: ClothingPutDto
  ) {
    const isAllowed = await this.clothingRepo.clothingBelongsToUser(
      clothingId,
      userId
    );
    if (!isAllowed)
      throw new ForbiddenError(
        "Clothing does not exist or user is not allowed."
      );

    return this.clothingRepo.updateClothing(clothingId, payload);
  }

  async deleteClothing(userId: number, clothingId: number) {
    const found = await this.clothingRepo.findClothing(clothingId);

    const deleteResult = await this.clothingRepo.deleteClothing(
      userId,
      clothingId
    );
    if (!found || deleteResult.count === 0)
      throw new BadRequestError(
        "Clothing not found or user does not have access."
      );

    if (process.env.IS_S3_STORAGE === "false") {
      const splits = found.imgUrl.split("/");
      const imgName = splits[splits.length - 1];
      unlink(getPublicUploadsPath() + imgName, (err) => {
        console.log(err);
      });
    }

    return deleteResult;
  }
}
