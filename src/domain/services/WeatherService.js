const WeatherData = require('../entities/WeatherData');
const ApiWeatherService = require('../services/ApiWeatherService');

class WeatherService {

  static async fetchWetherData(cities = []) {

    const weatherDataPromises = cities.map(city => ApiWeatherService.getWeatherCurrent(city, 'pt'));

    const responses = await Promise.all(weatherDataPromises);
    return responses.map(response => {
      const weather = new WeatherData(response);

      weather.updateTemp();

      return weather;
    })

  }

  static async generateNewWeather(city, lang = 'pt') {
    const response = await ApiWeatherService.getWeatherCurrent(city, lang);

    const weather = new WeatherData(response);
    weather.updateTemp();
    return weather;
  }
}

module.exports = WeatherService;