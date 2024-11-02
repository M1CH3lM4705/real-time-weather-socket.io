const NewsArticle = require("./NewsArticle");

class NewsResponse {
  constructor(data) {
    this.status = data.status;
    this.totalResults = data.totalResults;
    this.articles = data.articles.map(article => new NewsArticle(article));
  }
}

module.exports = NewsResponse