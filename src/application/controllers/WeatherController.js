const WeatherService = require('../../domain/services/WeatherService');

class WeatherController {
  constructor(io) {
    this.io = io;
    this.connectedClients = {};
    this.defaultCities = ['Porto Velho', 'São Paulo', 'Rio de Janeiro', 'Fortaleza'];
  }

  static async init({ io }) {
    const controller = new WeatherController(io);
    controller.defaultWeatherData = await WeatherService.fetchWetherData(controller.defaultCities);
    return controller;
  }

  addClient(socket) {
    console.log(`Client ${socket.id} conectado!`)

    this.connectedClients[socket.id] = {
      receiveNotification: true,
      cities: [...this.defaultWeatherData],
      customCities: []
    };

    socket.emit('updateWeathers', this.connectedClients[socket.id].cities);

    socket.on('addWeather', async ({ city, lang }) => {
      const weather = await WeatherService.generateNewWeather(city, lang);
      this.connectedClients[socket.id].customCities.push(weather);

      console.log(`Client ${socket.id} adicionou a cidade ${city}`)

      this.io.to(socket.id).emit('addCityWeatherData', weather);
    });

    socket.on('disconnect', () => delete this.connectedClients[socket.id]);
  }

  async sendWeatherNotification() {

    for (const socketId in this.connectedClients) {
      if (this.connectedClients[socketId].receiveNotification) {
        const clientData = this.connectedClients[socketId];

        const updateDefaultWeather = await WeatherService.fetchWetherData(this.defaultCities);

        const filterCustomCitiesWeather = clientData.customCities.map(({ location }) => location.name);
        const updateCustomWeather = await WeatherService.fetchWetherData(filterCustomCitiesWeather);

        clientData.cities = [...new Set(updateDefaultWeather)];
        clientData.customCities = [...new Set(updateCustomWeather)];

        const allUpdatedWeather = [...clientData.cities, ...clientData.customCities];

        this.io.to(socketId).emit('updateWeathers', allUpdatedWeather);
      }
    }
  }
}

module.exports = WeatherController;