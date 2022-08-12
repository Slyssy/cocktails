// const { apiKey } = require('./main.js');
// console.log(apiKey);
let arrayOfIngredients;
// This function waits for the web page to be loaded, when it does it will run the code inside of it which happens to be getPosts()
window.onload = function () {
  //  *Call functions on page load.
  // lookupDrink();
  getIngredientsList();
  // searchByIngredient();
};

// %%%%%%%%%%%%%%%%%%%%%% Lookup cocktail by cocktail ID %%%%%%%%%%%%%%%%%%%%%%
const lookupDrink = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch('https://the-cocktail-db.p.rapidapi.com/lookup.php?i=12067', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      console.log('Cocktail by ID', dataArray);
    })
    .catch((err) => console.error(err));
};

// %%%%%%%%%%%%%%%%%%%%%%% Get A List of Ingredients %%%%%%%%%%%%%%%%%%%%%%%%%%
const getIngredientsList = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      console.log('List of Ingredients', dataArray);
      // * Creating an array of all the ingredients.
      const arrayOfIngredients = dataArray.map(
        (ingredient) => ingredient.strIngredient1
      );
      //* Adding arrayOfIngredients to dropdown menu
      const ingredientDropdown = document.getElementById('ingredient-list');
      arrayOfIngredients.forEach((ingredient) => {
        ingredientDropdown.innerHTML += `<option >${ingredient}</option>`;
      });
    })
    .catch((err) => console.error(err));
};

// %%%%%%%%%%%%%%%%%%%%%%% Search by Ingredients %%%%%%%%%%%%%%%%%%%%%%%%%%
const searchByIngredient = () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch(
    'https://the-cocktail-db.p.rapidapi.com/filter.php?i=Club%20Soda',
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      console.log('Search Ingredients', dataArray);
    })
    .catch((err) => console.error(err));
};
