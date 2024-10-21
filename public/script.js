const cardsContainer = document.getElementById('cardsContainer');
const cityInput = document.getElementById('cityInput');
const sendButton = document.getElementById('sendButton');
const socket = io();

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
  p2.textContent = `Condições: ${data.current.condition.text}`
  img.src = `https:${data.condition.icon}`
  p3.textContent = `Sensação térmica de ${data.current.heatindexC}`
  p4.textContent = data.date

  console.log(`Atualizou o card ${card.id}`)
}

const createCardWeather = data => {
  const card = document.createElement('div');
  card.id = data.location.name.replace(/\s/g, '');
  console.log(`Criou Card: ${card.id}`)
  card.className = 'card';
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

function toogleCityInput() {
  if (cityInput.value.trim() === '') {
    sendButton.disabled = true;
  } else {
    sendButton.disabled = false;
  }
}

