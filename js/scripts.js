let pokemonList = [];
pokemonList = [
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
for (let i=0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.5) {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big!`)                
    } else {
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})`);
    }
}