let pokemonRepository = (function(){
    //Array to store Pokemon data
    let pokemonList = [
    {
        name: 'Fearow',
        height: 1.2 ,
        types: ['normal', 'flying']
    },
    {
        name: 'Butterfree',
        height: 1.1 ,
        types: ['bug', 'flying']
    },
    {
        name: 'Golbat',
        height: 1.6,
        types: ['poison', 'flying']
    },
    {
        name: 'Slowpoke',
        height: 1.2,
        types: ['psychic', 'water']
    }
];

//Function to add a pokemon to the repository
function add(pokemon) {
    //Check if the input is a valid object
    if (typeof pokemon === 'object' && pokemon !== null) {
        //Add the pokemon to the pokemonList array
        pokemonList.push(pokemon);
    } else {
        //Log an error message if the input is not a valid object
        console.error('Error: Invalid type. Only objects can be added to pokemonList')
    }        
};

//Function to get all pokemon from the repository
function getAll() {
    return pokemonList;
};

//Function to display the pokemon list on the webpage
function addListItem(pokemon) {

    //Select the unordered list element with the class 'pokemon-list'
    let pokemonList = document.querySelector('.pokemon-list');

    //Create a new list item element
    let listItem = document.createElement('li');  
    
    //Create a new button element
    let button = document.createElement('button');

    //Set the button's text to the pokemon's name
    button.innerText = pokemon.name; 
    
    //Add class to the button
    button.classList.add('pokemon-button');   
    
    //Append the button to the list item
    listItem.appendChild(button);
    
    //Append the list item to the unordered list
    pokemonList.appendChild(listItem); 

    //Call the function to add event listener
    addButtonEventListener(button,pokemon);
}

//Function to show details of a pokemon
function showDetails(pokemon) {
    console.log(pokemon);
}

//Function to add event listener to the button
function addButtonEventListener(button,pokemon) {
    button.addEventListener('click', function (event){
        showDetails(pokemon);
    })
}

//Return an object containing the public methods
return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
};

})();  


// Loop through each Pokemon in the list and call addListItem to display them on the webpage
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
