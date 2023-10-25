type Joke = {
  id: string,
  joke: string,
  score?: number,
  date?: string
}
const jokeElement = document.getElementById('joke');

var reportJokes: Joke[] = [];

var joke:Joke = {
  id: '',
  joke: ''
}

type Weather = {
  temperature: string;
  description: string,
  iconCode: string
}

const weatherElement = document.getElementById('weather');

var currentWeather: Weather;

nextJoke();
getCurrentWeather();

function nextJoke() {
  if (joke.joke !== '') printBackground();
  if (joke.score !== undefined) {
    const jokeExists = reportJokes.some(el => el.id === joke.id);
    if (!jokeExists) reportJokes.push(joke);
    if (reportJokes.length !== 0) console.log(reportJokes);
  }  
  Math.random() < 0.5 ? randomJoke() : randomChuckNorrisJoke();
};

async function randomJoke() {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      "Accept": "application/json"
    }
  }).then(response => response.json())
    .then(data => fillJokeData(data))
    .then(printJoke);
}

async function randomChuckNorrisJoke() {
  fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(data => fillChuckNorrisJokeData(data))
    .then(printJoke);
}

async function getCurrentWeather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.390205&lon=2.154007&appid=d6b868d62cbb3509a8c9e9ed6f568fa0')
    .then(response => response.json())
    .then(data => fillWeatherData(data))
}

async function getWeatherIcon(iconCode: string) {
  if (iconCode != undefined) {
    fetch('https://openweathermap.org/img/wn/' + iconCode + '@2x.png')
    .then((response) => response.blob())
    .then((blob) => printWeather(blob));
  }
}

var rateButtons = document.querySelectorAll('.rate-button');
rateButtons.forEach(button => {
    button.addEventListener('click', function() {
      let idCode = button.id.split('rate-button-')[1];
      joke.score = Number(idCode);
      joke.date = new Date().toISOString();
    });
});

function fillWeatherData(data: any) {
  let tempCelcius = farenheitToCelcius(data.main.temp);
  currentWeather = {
    temperature: tempCelcius,
    description: data.weather[0].description,
    iconCode: data.weather[0].icon
  }
  getWeatherIcon(currentWeather.iconCode)
}

function farenheitToCelcius(f: any) {
  return ((Number(f)-273.15)).toFixed(1) + ' ºC'.toString();
}
  
function fillJokeData(data: any) {
  joke = {
    id: data.id,
    joke: data.joke,
  }
  console.log(joke);
}

function fillChuckNorrisJokeData(data: any) {
  joke = {
    id: data.id,
    joke: data.value,
  }
  console.log(joke);
}

function printWeather(element: Blob | MediaSource) {
  const imageUrl = URL.createObjectURL(element);
  const imageElement = document.createElement("img");
  const tempElement = document.createElement("div");
  imageElement.classList.add("iconDiv");
  tempElement.innerText = currentWeather.temperature;
  imageElement.src = imageUrl;
  weatherElement?.appendChild(imageElement);
  weatherElement?.appendChild(tempElement);
}

function printJoke() {
  if (jokeElement != null) jokeElement.innerText = joke.joke;
}

function printBackground() {
  let oldClass = document.body.classList[0];
  const number = Math.floor(Math.random() * 5) + 1;
  let newClass = 'coolBackground' + number;
  if (oldClass === newClass) printBackground();
  else {
    document.body.classList.remove(oldClass);
    document.body.classList.add(newClass);
  }
  
}