const API_KEY = process.env.WEATHER_API_KEY;

class ApiWeatherService {

  static async getWeatherCurrent(city, lang) {
    if (city === '')
      throw Error('É preciso informar uma cidade');

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?q=${city}&lang=${lang}&key=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`Erro ao acessar a API: ${response.statusText}`);
    }

    const json = await response.json();

    return json;
  }
}

module.exports = ApiWeatherService;