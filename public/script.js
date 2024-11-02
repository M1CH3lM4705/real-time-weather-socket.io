const cardsContainer = document.getElementById('cardsContainer');
const cardsNews = document.getElementById('cardsContainer2');
const cityInput = document.getElementById('cityInput');
const sendButton = document.getElementById('sendButton');
const socket = io();
let countCard = 0;

document.addEventListener('DOMContentLoaded', function () {

  cityInput.addEventListener('input', function () {
    toogleCityInput();
  });
});

const updateCardWeather = (data, card) => {
  if (card === null)
    return;
  const [h3, p1, img, div] = Array.from(card.children);
  const [p2, p3, p4] = Array.from(div.children)

  h3.textContent = data.location.name;
  p1.textContent = `${data.current.tempC}`;
  p2.textContent = `${data.current.condition.text}`
  img.src = `https:${data.current.condition?.icon}`
  p3.textContent = `Sensação térmica de ${data.current.heatindexC}`
  p4.textContent = data.date

  console.log(`Atualizou o card ${card.id}`)
}

const createCardWeather = data => {

  const card = document.createElement('div');
  card.id = data.location.name.replace(/\s/g, '');
  card.className = 'card';
  card.style.animationDelay = `${countCard}ms`
  card.innerHTML = `
                    <h3>${data.location.name}</h3>
                    <p class="tempC">${data.current.tempC}</p>
                    <img src="https:${data.current.condition.icon}" alt="que representa o clima" />
                    <div class="card-info">
                    <p>${data.current.condition.text}</p>
                    <p>Sensação térmica de ${data.current.heatindexC}</p>
                    <p>${data.date}</p>
                    </div>
                    `;
  console.log(`Criou Card: ${card.id}`)
  countCard += 300;
  return card;
}

const createCardNews = data => {
  const card = document.createElement('div');

  card.className = 'news-card';
  card.style.animationDelay = `${countCard}ms`
  card.innerHTML = `
                    <div style="display:flex; gap:.25rem;">
                    <p class="news-author">${data.author}</p>
                    <p class="news-date">${data.publishedAt}</p>
                    </div>
                    <h3 class="news-title">${data.title}</h3>
                    <a href="${data.url}" target="_blank" class="news-link">Ler mais</a>
                    `;
  //console.log(`Criou Card: ${card.id}`)
  countCard += 300;
  return card;
}

socket.on('updateWeathers', (weatherData) => {

  weatherData.forEach(data => {
    const id = document.querySelector(`#${data.location.name.replace(/\s/g, '')}`);
    id === null ? cardsContainer.appendChild(createCardWeather(data)) :
      updateCardWeather(data, id);
  });
});


sendButton.addEventListener('click', () => {

  socket.emit('addWeather', { city: cityInput.value });
});


socket.on('addCityWeatherData', (data) => {

  cardsContainer.appendChild(createCardWeather(data));

  cityInput.value = '';

  toogleCityInput();
});

socket.on('onNews', (news) => {
  countCard = 0
  news.forEach(data => {
    cardsNews.appendChild(createCardNews(data))
  })
});

function toogleCityInput() {
  if (cityInput.value.trim() === '') {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
}

