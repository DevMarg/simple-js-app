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
      button.classList.add("pokemon-button");
  
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
  
    //Select the modal container element
    let modalContainer = document.querySelector("#modal-container");
  
  
    //Function to show details of a pokemon
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        showModal(item);
      });
    }
  
    //Function to display modal with pokemon details
    function showModal(pokemon) {
  
      //Clear any existing content inside the modal container
      modalContainer.innerHTML = "";
  
      //Create a new modal container element
      let modal = document.createElement("div");
      modal.classList.add("modal");
  
      //Create a close button for the modal
      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "x";
      closeButtonElement.addEventListener("click", hideDetails);
  
      //Create an element to display the pokemon's name
      let nameElement = document.createElement("h2");
      nameElement.innerText = pokemon.name;
  
      //Create an element to display the pokemon's height
      let heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + pokemon.height;
  
      //Extract type names from the pokemon's types array
      let typeNames = pokemon.types.map((type) => type.type.name).join(", ");
  
      //Create an element to display the pokemon's types
      let typeElement = document.createElement("p");
      typeElement.innerText = "Type: " + typeNames;
  
      // Create an element to display the pokemon's image
      let imageElement = document.createElement("img");
      imageElement.src = pokemon.imageUrl;
  
      // Append all elements to the modal container
      modal.appendChild(closeButtonElement);
      modal.appendChild(nameElement);
      modal.appendChild(heightElement);
      modal.appendChild(typeElement);
      modal.appendChild(imageElement);
      modalContainer.appendChild(modal);
  
      // Add class to the modal container to make it visible
      modalContainer.classList.add("is-visible");
  
      // Function to hide modal details when close button is clicked
      function hideDetails() {
        modalContainer.classList.remove("is-visible");
      }
  
      //Close modal when pressing Escape key
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideDetails();
        }
      });
  
      //Close modal when pressing outside of it
      document.body.addEventListener("click", function (event) {
          // Check if the clicked element is not inside the modal
        if (!event.target.closest(".modal")) {
          hideDetails();
        }
      });
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
