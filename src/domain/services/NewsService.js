const ApiNewsService = require('../services/ApiNewsService');
const NewsResponse = require('../entities/NewsResponse');
class NewsService {

  static async getNews() {
    const response = await ApiNewsService.getNews();

    const newsResponse = new NewsResponse(response);

    return newsResponse.articles;
  }
}

module.exports = NewsService;