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
const a = document.getElementById('joke');
var reportJokes = [];
var joke = {
    id: '',
    joke: ''
};
nextJoke();
function nextJoke() {
    if (joke.score !== undefined) {
        reportJokes.push(joke);
        if (reportJokes.length !== 0)
            console.log(reportJokes);
    }
    randomJoke();
}
;
function randomJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json())
            .then(data => fillData(data))
            .then(printJoke);
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
function fillData(data) {
    joke = {
        id: data.id,
        joke: data.joke,
    };
    console.log(joke);
}
function printJoke() {
    if (a != null)
        a.innerText = joke.joke;
}
