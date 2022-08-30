import { User } from "@prisma/client";
import {
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { multerConfig } from "../../utils/multerConfig";
import { ClothingService } from "./ClothingService";
import { AwsFileDto } from "./types/AwsFileDto";
import { ClothingPutDto } from "./types/ClothingPutDto";
import { MulterFileDto } from "./types/MulterFileDto";

@JsonController("/clothings")
export class ClothingController {
  constructor(private clothingService = new ClothingService()) {}
  @Get()
  getAllClothings(@CurrentUser() user: User) {
    return this.clothingService.findUserClothings(user.id);
  }

  @Post()
  createClothing(
    @CurrentUser({ required: true }) user: User,
    @UploadedFile("image", { options: multerConfig })
    file: AwsFileDto | MulterFileDto
  ) {
    return this.clothingService.createClothing(user.id, file);
  }

  @Put("/:id")
  updateClothing(
    @CurrentUser({ required: true }) user: User,
    @Param("id") clothingId: number,
    @Body() body: ClothingPutDto
  ) {
    return this.clothingService.updateClothing(user.id, clothingId, body);
  }

  @Delete("/:id")
  deleteClothing(
    @CurrentUser({ required: true }) user: User,
    @Param("id") clothingId: number
  ) {
    return this.clothingService.deleteClothing(user.id, clothingId);
  }
}
