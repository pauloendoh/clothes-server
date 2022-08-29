import axios from "axios";
import { config } from "dotenv";
import { InternalServerError } from "routing-controllers";
import { urls } from "../../utils/urls";
import { CurrentWeatherDto, WeatherResponseDto } from "./types/WeatherDto";
config();

export class WeatherService {
  async getCurrWeather(lat: number, lon: number): Promise<CurrentWeatherDto> {
    try {
      const res = await axios.get<WeatherResponseDto>(
        urls.openMeteoApi(lat, lon)
      );

      return {
        temperature: res.data.current_weather.temperature,
        time: res.data.current_weather.time,
      };
    } catch (err) {
      throw new InternalServerError(
        "Error while getting data from Open Weather API."
      );
    }
  }
}
