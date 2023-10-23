type Joke = {
  id: string,
  joke: string,
  score?: number,
  date?: string
}
const a = document.getElementById('joke');

var reportJokes: Joke[] = [];

var joke:Joke = {
  id: '',
  joke: ''
}

nextJoke();

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
    .then(data => fillData(data))
    .then(printJoke);
}

var rateButtons = document.querySelectorAll('.rate-button');
rateButtons.forEach(button => {
    button.addEventListener('click', function() {
      let idCode = button.id.split('rate-button-')[1];
      joke.score = Number(idCode);
      joke.date = new Date().toISOString();
    });
});
  
function fillData(data: any) {
  joke = {
    id: data.id,
    joke: data.joke,
  }
  console.log(joke);
}

function printJoke() {
  if (a!= null) a.innerText = joke.joke;
}