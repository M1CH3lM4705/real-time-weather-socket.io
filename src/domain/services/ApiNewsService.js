const API_KEY = process.env.NEWS_API_KEY;

class ApiNewsService {

  static async getNews() {

    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=${API_KEY}`)

    if (!response.ok) {
      throw new Error(`Erro ao acessar a API: ${response.statusText}`);
    }

    const json = await response.json();

    return json;
  }
}

module.exports = ApiNewsService;