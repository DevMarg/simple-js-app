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

return {
    add: add,
    getAll: getAll
};

}) ();
console.log(pokemonRepository.getAll());
console.log(pokemonRepository.add({name: "Oddish", height: 0.5, types: ['grass', 'poison']}));

// Display all Pokemon with name and height. Add a comment for the biggest one.
pokemonRepository.getAll().forEach(function(item){
    if (item.height > 1.5) {
        document.write("<p>" + item.name + " " + item.height +  " - Wow, that's big!" + "</p>");                
    } else {
        document.write("<p>" + item.name + " " + item.height + "</p>");
    }
});
