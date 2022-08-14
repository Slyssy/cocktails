// const { apiKey } = require('./main.js');
// console.log(apiKey);
let listOfDrinksArray;

// This function waits for the web page to be loaded, when it does it will run the code inside of it which happens to be getPosts()
window.onload = function () {
  //  *Call functions on page load.
  getIngredientsList();
};

// %%%%%%%%%%%%%%%%%%%%%% Lookup cocktail by cocktail ID %%%%%%%%%%%%%%%%%%%%%%
const lookupDrink = (drinkID) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch(
    `https://the-cocktail-db.p.rapidapi.com/lookup.php?i=${drinkID}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      //* Returns an array of a single object.
      dataArray = data.drinks;
      console.log('Cocktail by ID', dataArray);
      //* Accessing array of fetched data and setting it to a variable.
      const drinkObject = dataArray[0];
      //* Create an array of keys that contain the string 'strIngredient'.
      const arrayOfIngredientKeys = Object.keys(drinkObject).filter((drink) =>
        drink.includes('strIngredient')
      );
      // console.log(arrayOfIngredientKeys);
      // *Filtering array to include only keys that do not have "null" values.
      const arrayOfNotNullKeys = arrayOfIngredientKeys.filter((el) => {
        return drinkObject[el];
      });
      // console.log(arrayOfNotNullKeys);
      // *Filtering not null keys and creating an array of their values.
      arrayOfIngredients = arrayOfNotNullKeys.map((key) => drinkObject[key]);
      //* Create an array of keys that contain the string 'strIngredient'.
      const arrayOfMeasurementKeys = Object.keys(drinkObject).filter((drink) =>
        drink.includes('strMeasure')
      );
      // console.log(arrayOfIngredientKeys);
      // *Filtering array to include only keys that do not have "null" values.
      const arrayOfNotNullMeasurementKeys = arrayOfMeasurementKeys.filter(
        (el) => {
          return drinkObject[el];
        }
      );
      // console.log(arrayOfNotNullKeys);
      // *Filtering not null keys and creating an array of their values.
      arrayOfMeasurements = arrayOfNotNullMeasurementKeys.map(
        (key) => drinkObject[key]
      );
      // * Inserting HTML Elements in the section below.

      //* Adding Modal HTML
      const modalHTML = `
        <div class="modal-container" id="modal-container">
        <div class="modal">
          <h1>${drinkObject.strDrink}</h1>
          <figure class="modal-image">
            <img
              src=${drinkObject.strDrinkThumb}
              alt="cocktail image"
            />
          </figure>
          <h3>Preferred Glass Type:</h3>
          <p>${drinkObject.strGlass}</p>
          <h3>Ingredients</h3>
          <ul id="drink-ingredients">
          </ul>
          <h4>Mixing Instructions</h4>
          <p>
            ${drinkObject.strInstructions}
          </p>
          <button id="close">Close</button>
        </div>
      </div>
        `;

      // * Setting variables to  work with the HTML created above and add a
      // *  modal to display individual drink details.
      const pageContainer = document.getElementById('page-container');
      pageContainer.insertAdjacentHTML('afterbegin', modalHTML);
      //* Targeting HTML Elements Associated with Modal
      const modalContainer = document.getElementById('modal-container');
      const modalCloseBtn = document.getElementById('close');
      const header = document.querySelector('header');
      const main = document.querySelector('main');

      // *Looping through the arrayOfIngredients to insert a list of measurements & ingredients.
      arrayOfIngredients.forEach((el, index) => {
        const li = `<li>${
          //* Making is so that drinks without measurement do not return
          //* "undefined".
          // * Using the index to count each loop and use that number to index
          // * the array of measurements to return the corresponding  measurement value.
          arrayOfMeasurements[index] === undefined
            ? (arrayOfMeasurements[index] = '')
            : arrayOfMeasurements[index]
        } - ${el}</li>`;

        // * Inserting the list elements created above.
        const ingredientList = document.getElementById('drink-ingredients');
        ingredientList.insertAdjacentHTML('beforeend', li);
      });

      // * Below is the functionality that will open and close the modal. Modal
      // *  is opened when the lookupDrink() function is triggered when the
      // *  drink image is selected, and the modal is hidden when the close
      // *  button is clicked.
      modalContainer.classList.add('show');
      main.classList.add('hide');
      header.classList.add('hide');
      modalCloseBtn.addEventListener('click', () => {
        modalContainer.classList.remove('show');
        main.classList.remove('hide');
        header.classList.remove('hide');
      });
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
  // Leah going to write code here

  fetch('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
      //* Sort the arrayOfIngredients array alphabetically.
      dataArray.sort((a, b) => {
        const strIngredient1A = a.strIngredient1.toLowerCase();
        const strIngredient1B = b.strIngredient1.toLowerCase();
        if (strIngredient1A < strIngredient1B) {
          return -1;
        }
        if (strIngredient1A > strIngredient1B) {
          return 1;
        }
        return 0;
      });
      // console.log('this is the data.drinks:', dataArray);

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
// * Getting ingredient from dropdown menu
const searchByIngredient = (ingredient) => {
  ingredient = document.getElementById('ingredient-list');
  // * Setting variable to store the value selected from the dropdown menu.
  const specifiedIngredient = ingredient.options[ingredient.selectedIndex].text;

  // console.log(`The selected ingredient is: ${specifiedIngredient}`);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07',
      'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
    },
  };

  fetch(
    `https://the-cocktail-db.p.rapidapi.com/filter.php?i=${specifiedIngredient}`,
    options
  )
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const drinkContainer = document.querySelector('#cards-container');
      // * Creates an array of objects that contain Drink Name, Thumb and ID.
      listOfDrinksArray = data.drinks;
      // console.log('List of drinks with ingredient', listOfDrinksArray);
      // * Clearing the drink container before new HTML is added.
      drinkContainer.innerHTML = '';
      // * Creating an array of drink ID's
      drinks = listOfDrinksArray.map((drink) => {
        const drinkName = drink.strDrink;
        const drinkID = drink.idDrink;
        const drinkThumb = drink.strDrinkThumb;
        const html = `
        <article id="drink-container">
      <figure>
          <figcaption>${drinkName}</figcaption>
          <img
            src="${drinkThumb}"
            alt="Cocktail or Drink Image"
            id="${drinkID}"
            class="drink-card-image"
          />
        </figure>
        </article>
      `;
        drinkContainer.insertAdjacentHTML('beforeend', html);
        // * Adding event listener to each of the drink images. This will call
        // * the lookUpDrink() function
        const drinkImage = document.getElementById(`${drinkID}`);
        drinkImage.addEventListener('click', (event) => {
          // * Calling the lookupDrink() function to get the drink's full details.
          lookupDrink(drinkImage.id);
        });
      });
    })
    .catch((err) => console.error(err));
};
