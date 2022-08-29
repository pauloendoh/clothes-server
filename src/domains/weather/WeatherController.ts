import { User } from "@prisma/client";
import {
  CurrentUser,
  Get,
  JsonController,
  QueryParam,
} from "routing-controllers";
import { WeatherService } from "./WeatherService";

@JsonController("/weather")
export class WeatherController {
  constructor(private weatherService = new WeatherService()) {}
  @Get()
  getAllClothings(
    @CurrentUser({ required: true }) user: User,
    @QueryParam("lat", { required: true }) lat: number,
    @QueryParam("lon", { required: true }) lon: number
  ) {
    return this.weatherService.getCurrWeather(lat, lon);
  }
}
