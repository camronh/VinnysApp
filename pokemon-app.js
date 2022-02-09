const axios = require("axios");

async function getPokemon() {
  // Destructure the `data` key from the response from axios
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/6");
  console.log(data);
  //   Use variable in a string
  console.log(`My pokemon's name is ${data.name}`);
}


// Run getPokemon on start
getPokemon(6);



/*
Write me a function where:

- Pass in the pokemon's id OR name
- You return an object in this format:

    {
        name: pokemon's name,
        id: pokemon's id,
        stats: [
            nameOfStat: valueOfStat,
            nameOfStat: valueOfStat,
        ]
        image: pokemon.sprites.front_default
    }
*/