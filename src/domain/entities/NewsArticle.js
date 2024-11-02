const DateValue = require("../valueObjects/DateValue");

class NewsArticle {
  constructor(data) {
    this.source = {
      id: data.source.id,
      name: data.source.name
    };
    this.author = data.author;
    this.title = data.title;
    this.description = data.description;
    this.url = data.url;
    this.urlToImage = data.urlToImage;
    this.publishedAt = new DateValue(data.publishedAt).hourTimeFromNow();
    this.content = data.content;
  }
}

module.exports = NewsArticle;