// const { apiKey } = require('./main.js');
// console.log(apiKey);

// This function waits for the web page to be loaded, when it does it will run the code inside of it which happens to be getPosts()
window.onload = function () {
  //  *Call functions on page load.
  lookupDrink();
};

const lookupDrink = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      console.log(dataArray);
    })
    .catch((err) => console.error(err));
};

const getDrinks = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=11007', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      console.log(dataArray);
    })
    .catch((err) => console.error(err));
};
