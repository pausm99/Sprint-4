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
  description: string,
}

const weatherElement = document.getElementById('weather');

var currentWeather: Weather;

nextJoke();
getCurrentWeather();

function nextJoke() {
  if (joke.score !== undefined) {
    reportJokes.push(joke);
    if (reportJokes.length !== 0) console.log(reportJokes);
  }  
  randomJoke();
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

async function getCurrentWeather() {
  fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.390205&lon=2.154007&appid=d6b868d62cbb3509a8c9e9ed6f568fa0')
    .then(response => response.json())
    .then(data => fillWeatherData(data))
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
  currentWeather = {
    description: data.weather[0].description,
  }
  printWeather();
}
  
function fillJokeData(data: any) {
  joke = {
    id: data.id,
    joke: data.joke,
  }
  console.log(joke);
}

function printWeather() {
  if (weatherElement != null) {
    weatherElement.innerText = 'Today: ' + currentWeather.description;
    weatherElement.style.textTransform = "capitalize";
  }
  
}

function printJoke() {
  if (jokeElement != null) jokeElement.innerText = joke.joke;
}