const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] =types
  pokemon.types =  types
  pokemon.type = type
  pokemon.photo = pokeDetail.sprites.other.home.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon)=>{
    return fetch(pokemon.url)
        .then((resp) => resp.json())
        .then(convertPokeApiDetailToPokemon)
}


pokeApi.getPokemons = (offset = 0, limit = 12) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  
  return fetch(url)
    .then((resp) => resp.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((dataRequests)=> Promise.all(dataRequests))
    .then((pokemonsDetails)=> pokemonsDetails)
    
};

Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/1`),
    fetch(`https://pokeapi.co/api/v2/pokemon/2`),
    fetch(`https://pokeapi.co/api/v2/pokemon/3`),
    fetch(`https://pokeapi.co/api/v2/pokemon/4`)
  ]).then((results) => {
    console.log(results)
  })
