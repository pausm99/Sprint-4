type Joke = {
  id: string,
  joke: string
}
const a = document.getElementById('jokeDiv');


var joke: Joke =  {
  id: '',
  joke: ''
}

randomJoke();


async function randomJoke() {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      "Accept": "application/json"
    }
  }).then(response => response.json())
    .then(data => {
      joke.id = data.id;
      joke.joke = data.joke;
      console.log(data);
    })
    .then(printJoke);
   
}
  

function printJoke() {
  if (a!= null) a.innerText = joke.joke;
}