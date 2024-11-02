const DateValue = require('../valueObjects/DateValue');

class WeatherData {
  constructor(data) {

    this.location = {
      name: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      tzId: data.location.tz_id, // Corrected property name
      localtimeEpoch: data.location.localtime_epoch,
      localtime: data.location.localtime
    };


    this.current = {
      lastUpdatedEpoch: data.current.last_updated_epoch,
      lastUpdated: data.current.last_updated,
      tempC: data.current.temp_c,
      tempF: data.current.temp_f,
      isDay: data.current.is_day,
      condition: {
        text: data.current.condition.text,
        icon: data.current.condition.icon,
        code: data.current.condition.code
      },
      windMph: data.current.wind_mph,
      windKph: data.current.wind_kph,
      windDegree: data.current.wind_degree,
      windDir: data.current.wind_dir,
      pressureMb: data.current.pressure_mb,
      pressureIn: data.current.pressure_in,
      precipMm: data.current.precip_mm,
      precipIn: data.current.precip_in,
      humidity: data.current.humidity,
      cloud: data.current.cloud,
      feelslikeC: data.current.feelslike_c,
      feelslikeF: data.current.feelslike_f,
      windchillC: data.current.windchill_c,
      windchillF: data.current.windchill_f,
      heatindexC: data.current.heatindex_c,
      heatindexF: data.current.heatindex_f,
      dewpointC: data.current.dewpoint_c,
      dewpointF: data.current.dewpoint_f,
      visKm: data.current.vis_km,
      visMiles: data.current.vis_miles,
      uv: data.current.uv,
      gustMph: data.current.gust_mph,
      gustKph: data.current.gust_kph
    };

    this.date = new DateValue(this.current.lastUpdated).weekdayAbreviation();
  }

  updateTemp() {
    this.current.tempC = this.getFormattedTemp();
    this.current.heatindexC = `${this.current.heatindexC.toFixed(0)}°C`
  }

  getFormattedTemp(isCelsius = true) {
    const temp = isCelsius ? this.current.tempC : this.current.tempF;
    return `${temp.toFixed(0)}°${isCelsius ? 'C' : 'F'}`;
  }
}

module.exports = WeatherData;