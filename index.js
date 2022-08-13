// const { apiKey } = require('./main.js');
// console.log(apiKey);
let listOfDrinksArray;

// This function waits for the web page to be loaded, when it does it will run the code inside of it which happens to be getPosts()
window.onload = function () {
  //  *Call functions on page load.
  getIngredientsList();

  // searchByIngredient();
};

// %%%%%%%%%%%%%%%%%%%%%% Lookup cocktail by cocktail ID %%%%%%%%%%%%%%%%%%%%%%
const lookupDrink = (drinkID) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
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
      console.log("Cocktail by ID", dataArray);
      //* Accessing array of fetched data and setting it to a variable.
      const drinkObject = dataArray[0];
      //* Create an array of keys that contain the string 'strIngredient'.
      const arrayOfIngredientKeys = Object.keys(drinkObject).filter((drink) =>
        drink.includes("strIngredient")
      );
      // console.log(arrayOfIngredientKeys);
      // *Filtering array to include only keys that do not have "null" values.
      const arrayOfNotNullKeys = arrayOfIngredientKeys.filter((el) => {
        return drinkObject[el];
      });
      // console.log(arrayOfNotNullKeys);
      // *Filtering not null keys and creating an array of their values.
      arrayOfIngredients = arrayOfNotNullKeys.map((key) => drinkObject[key]);
      console.log(arrayOfIngredients);
    })
    .catch((err) => console.error(err));
};

// %%%%%%%%%%%%%%%%%%%%%%% Get A List of Ingredients %%%%%%%%%%%%%%%%%%%%%%%%%%
const getIngredientsList = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
    },
  };
  // Leah going to write code here
  // Sort the arrayOfIngredients array alphabetically.
  fetch("https://the-cocktail-db.p.rapidapi.com/list.php?i=list", options)
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      dataArray = data.drinks;
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
      console.log("this is the data.drinks:", dataArray);

      // * Creating an array of all the ingredients.
      const arrayOfIngredients = dataArray.map(
        (ingredient) => ingredient.strIngredient1
      );
      //* Adding arrayOfIngredients to dropdown menu
      const ingredientDropdown = document.getElementById("ingredient-list");
      arrayOfIngredients.forEach((ingredient) => {
        ingredientDropdown.innerHTML += `<option >${ingredient}</option>`;
      });
    })
    .catch((err) => console.error(err));
};

// %%%%%%%%%%%%%%%%%%%%%%% Search by Ingredients %%%%%%%%%%%%%%%%%%%%%%%%%%
// getting ingredient from dropdown menu
const searchByIngredient = (ingredient) => {
  ingredient = document.getElementById("ingredient-list");
  const specifiedIngredient = ingredient.options[ingredient.selectedIndex].text;

  console.log(`The selected ingredient is: ${specifiedIngredient}`);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0655aa903cmsh48b384669412764p17bd8fjsn60d6419ebf07",
      "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
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
      const drinkContainer = document.querySelector("#cards-container");
      // * Creates an array of objects that contain Drink Name, Thumb and ID.
      listOfDrinksArray = data.drinks;
      console.log("List of drinks with ingredient", listOfDrinksArray);
      // // * Creating an array of drink ID's
      drinkContainer.innerHTML = "";
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
        drinkContainer.insertAdjacentHTML("beforeend", html);
        const drinkImage = document.getElementById(`${drinkID}`);
        drinkImage.addEventListener("click", (event) => {
          lookupDrink(drinkImage.id);
        });
      });
    })
    .catch((err) => console.error(err));
};
