//Define pokemonRepository as an Immediately Invoked Function Expression (IIFE)
let pokemonRepository = (function () {
  //Initialize an empty array to store pokemon data
  let pokemonList = [];

  //Define the API URL to fetch pokemon data
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //Function to capitalize the first letter
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //Function to add a pokemon objects to pokemonList array
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.error("Error: Invalid type.");
    }
  }

  //Function to get all pokemon from the repository
  function getAll() {
    return pokemonList;
  }

  //JQuery's AJAX request to fetch the Pokemon data from the API
  function loadList() {
    return $.ajax({
      url: apiUrl,
      dataType: "json",
    })
      .then(function (response) {
        response.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .fail(function (xhr, textStatus, errorThrown) {
        console.error("Error", textStatus);
      });
  }

  //JQuery's AJAX request to fetch additional Pokemon data from the API
  function loadDetails(item) {
    return $.ajax({
      url: item.detailsUrl,
      dataType: "json",
    })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .fail(function (xhr, textStatus, errorThrown) {
        console.error("Error", textStatus);
      });
  }

  //Function to show details of a pokemon
  function showDetails(item) {
    loadDetails(item).then(function () {
      showModal(item);
    });
  }

  //Function to display the pokemon list on the webpage
  function addListItem(pokemon) {
    //Select element with class 'pokemon-list' with JQuery
    let pokemonList = $(".pokemon-list");

    //Create new list item  with JQuery
    let listItem = $("<li></li>");

    //Create new button displaying Pokemon name with JQuery
    let button = $("<button>" + capitalizeFirstLetter(pokemon.name) + "</button>");

    //Add classes to the button with JQuery
    button.addClass("btn btn-lg pokemon-button");

    // Fetch the image URL if it's not already available
    if (!pokemon.imageUrl) {
      loadDetails(pokemon).then(function () {
        // After loading details, update the button with the image
        let image = $("<img>");
        image.addClass("pokemon-image img-fluid");
        image.attr("src", pokemon.imageUrl);
        image.attr("alt", `Image of ${pokemon.name}`);
        button.append(image);
        

      });
    } else {
      // If the image URL is already available, create the image element immediately
      let image = $("<img>");
      image.addClass("pokemon-image img-fluid");
      image.attr("src", pokemon.imageUrl);
      image.attr("alt", `Image of ${pokemon.name}`);
      button.append(image);
    }

    //Append the button to the list item and listItem to pokemon list with JQuery
    listItem.append(button);
    pokemonList.append(listItem);

    //Attach click event listener to the button and show the details of Pokemon with JQuery
    button.on("click", function (event) {
      showDetails(pokemon);
    });
  }

  //Function to display modal with Pokemon details
  function showModal(pokemon) {
    // Select the modal elements with JQuery
    let modalImage = $(".modal-image");
    let modalName = $(".modal-name");
    let modalHeight = $(".modal-height");
    let modalAbilities = $(".modal-abilities");

    //Set attributes and text with JQuery
    modalImage.attr("src", pokemon.imageUrl);
    modalImage.attr("alt", pokemon.name);
    modalName.text(capitalizeFirstLetter(pokemon.name));
    modalHeight.text("Height: " + pokemon.height);

    //Map through the types of the Pokemon, extract their names, and join them with a comma
    let typeNames = pokemon.types.map((type) => type.type.name).join(", ");

    //Set the text of modalAbilities element to display the types of Pokemon
    modalAbilities.text("Type: " + typeNames);

    //Show modal with JQuery
    $("#pokemonModal").modal("show");
  }

  //Function to search by Pokemon's name
  function searchBar() {
    let $searchBar = $("#search-bar");

    //Event listener for search bar's input
    $searchBar.on("input", function () {
      let searchValue = $searchBar.val().toLowerCase();
      let filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(searchValue)
      );

      // Clear the Pokemon list
      let $pokemonListElement = $(".row");
      $pokemonListElement.empty();

      //No results message if nothing is found. Display Pokemon if available
      if (filteredPokemon.length === 0) {
        let message = "No results";
        $pokemonListElement.text(`\n\n\n\n\n\n${message}`);
      } else {
        filteredPokemon.forEach((pokemon) => {
          addListItem(pokemon);
        });
      }
    });
  }
  searchBar();

  // Return an object containing the public methods
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