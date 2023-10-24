"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jokeElement = document.getElementById('joke');
var reportJokes = [];
var joke = {
    id: '',
    joke: ''
};
const weatherElement = document.getElementById('weather');
var currentWeather;
nextJoke();
getCurrentWeather();
function nextJoke() {
    if (joke.score !== undefined) {
        const jokeExists = reportJokes.some(el => el.id === joke.id);
        if (!jokeExists)
            reportJokes.push(joke);
        if (reportJokes.length !== 0)
            console.log(reportJokes);
    }
    Math.random() < 0.5 ? randomJoke() : randomChuckNorrisJoke();
}
;
function randomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json())
            .then(data => fillJokeData(data))
            .then(printJoke);
    });
}
function randomChuckNorrisJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => fillChuckNorrisJokeData(data))
            .then(printJoke);
    });
}
function getCurrentWeather() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=41.390205&lon=2.154007&appid=d6b868d62cbb3509a8c9e9ed6f568fa0')
            .then(response => response.json())
            .then(data => fillWeatherData(data));
    });
}
var rateButtons = document.querySelectorAll('.rate-button');
rateButtons.forEach(button => {
    button.addEventListener('click', function () {
        let idCode = button.id.split('rate-button-')[1];
        joke.score = Number(idCode);
        joke.date = new Date().toISOString();
    });
});
function fillWeatherData(data) {
    currentWeather = {
        description: data.weather[0].description,
    };
    printWeather();
}
function fillJokeData(data) {
    joke = {
        id: data.id,
        joke: data.joke,
    };
    console.log(joke);
}
function fillChuckNorrisJokeData(data) {
    joke = {
        id: data.id,
        joke: data.value,
    };
    console.log(joke);
}
function printWeather() {
    if (weatherElement != null) {
        weatherElement.innerText = 'Today: ' + currentWeather.description;
        weatherElement.style.textTransform = "capitalize";
    }
}
function printJoke() {
    if (jokeElement != null)
        jokeElement.innerText = joke.joke;
}
