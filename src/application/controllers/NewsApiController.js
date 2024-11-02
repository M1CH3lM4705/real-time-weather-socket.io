const NewsService = require('../../domain/services/NewsService');

class NewsApiController {
  constructor(io) {
    this.io = io;
  }

  static async init({ io }) {
    const controller = new NewsApiController(io);

    controller.news = await NewsService.getNews();

    return controller;
  }

  connect() {
    this.io.emit('onNews', this.news)
  }
}

module.exports = NewsApiController