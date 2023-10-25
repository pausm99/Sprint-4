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
    if (joke.joke !== '')
        printBackground();
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
function getWeatherIcon(iconCode) {
    return __awaiter(this, void 0, void 0, function* () {
        if (iconCode != undefined) {
            fetch('https://openweathermap.org/img/wn/' + iconCode + '@2x.png')
                .then((response) => response.blob())
                .then((blob) => printWeather(blob));
        }
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
    let tempCelcius = farenheitToCelcius(data.main.temp);
    currentWeather = {
        temperature: tempCelcius,
        description: data.weather[0].description,
        iconCode: data.weather[0].icon
    };
    getWeatherIcon(currentWeather.iconCode);
}
function farenheitToCelcius(f) {
    return ((Number(f) - 273.15)).toFixed(1) + ' ºC'.toString();
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
function printWeather(element) {
    const imageUrl = URL.createObjectURL(element);
    const imageElement = document.createElement("img");
    const tempElement = document.createElement("div");
    imageElement.classList.add("iconDiv");
    tempElement.innerText = currentWeather.temperature;
    imageElement.src = imageUrl;
    weatherElement === null || weatherElement === void 0 ? void 0 : weatherElement.appendChild(imageElement);
    weatherElement === null || weatherElement === void 0 ? void 0 : weatherElement.appendChild(tempElement);
}
function printJoke() {
    if (jokeElement != null)
        jokeElement.innerText = joke.joke;
}
function printBackground() {
    let oldClass = document.body.classList[0];
    const number = Math.floor(Math.random() * 5) + 1;
    let newClass = 'coolBackground' + number;
    if (oldClass === newClass)
        printBackground();
    else {
        document.body.classList.remove(oldClass);
        document.body.classList.add(newClass);
    }
}
