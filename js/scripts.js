//Define pokemonRepository as an Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function () {
  //Initialize an empty array to store pokemon data
  let pokemonList = [];

  //Define the API URL to fetch pokemon data
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Function to add a pokemon to the repository
  function add(pokemon) {
    //Check if the input is valid
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      //Add the pokemon to the pokemonList array
      pokemonList.push(pokemon);
    } else {
      //Log an error message if the input is not valid
      console.error("Error: Invalid type.");
    }
  }

  //Function to get all pokemon from the repository
  function getAll() {
    return pokemonList;
  }

  //Function to display the pokemon list on the webpage
  function addListItem(pokemon) {
    //Select the unordered list element with the class 'pokemon-list'
    let pokemonList = document.querySelector(".pokemon-list");

    //Create a new list item element
    let listItem = document.createElement("li");

    //Create a new button element
    let button = document.createElement("button");

    //Set the button's text to the pokemon's name
    button.innerText = pokemon.name;

    //Add class to the button
    button.classList.add("btn", "btn-success", "btn-lg", "pokemon-button");

    //Append the button to the list item
    listItem.appendChild(button);

    //Append the list item to the unordered list
    pokemonList.appendChild(listItem);

    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //Function to load pokemon list from the API
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            height: item.height,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Function to load details of a pokemon from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //Function to show details of a pokemon
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //Function to display modal with pokemon details
  function showModal(pokemon) {
    // Select the modal content elements
    let modalImage = document.querySelector(".modal-image");
    let modalName = document.querySelector(".modal-name");
    let modalHeight = document.querySelector(".modal-height");
    let modalAbilities = document.querySelector(".modal-abilities");

    modalImage.src = pokemon.imageUrl;
    modalImage.alt = pokemon.name;
    modalName.innerText = pokemon.name;
    modalHeight.innerText = "Height: " + pokemon.height;

    //Extract type names from the pokemon's types array
    let typeNames = pokemon.types.map((type) => type.type.name).join(", ");
    modalAbilities.innerText = "Type: " + typeNames;

    // Show the modal by triggering Bootstrap modal's show method
    let modal = new bootstrap.Modal(document.getElementById("pokemonModal"), {});
    modal.show();
  }

  //Return an object containing the public methods
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Call the loadList function to fetch pokemon data from the API
pokemonRepository.loadList().then(function () {
  // After fetching data, loop through each pokemon and call addListItem to display them on the webpage
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});