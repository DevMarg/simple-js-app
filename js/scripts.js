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

function add(pokemon) {
    if (typeof pokemon === 'object' && pokemon !== null) {
        pokemonList.push(pokemon);
    } else {
        console.error('Error: Invalid type. Only objects can be added to pokemonList')
    }        
};

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
