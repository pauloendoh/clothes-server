export interface WeatherResponseDto {
  current_weather: CurrentWeatherDto;
}

export interface CurrentWeatherDto {
  temperature: number;
  time: string;
}
