const axios = require("axios");

async function getPokemon() {
  // Destructure the `data` key from the response from axios
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/6");
  console.log(data); //this is the entire response
  //   Use variable in a string
  console.log(`My pokemon's name is ${data.name}`);
}

//create an object helper function
async function createObject(apiDataResponse) {
  const pokeObj = new Object();
  pokeObj.name = apiDataResponse.name;
  pokeObj.id = apiDataResponse.id;
  pokeObj.stats = apiDataResponse.stats; //make it an array to print better?
  pokeObj.image = apiDataResponse.sprites.front_default;
  return pokeObj;
}

//api return object helper function
async function apiObject(apiUrl) {
  const response = await axios.get(apiUrl);
  if (response.status != 200) {
    throw "Request failed. Check input.";
  }
  const { data } = await axios.get(apiUrl);
  const retObj = await createObject(data); //helper function to create object
  console.log(JSON.stringify(retObj, null, 2));
}

//how to take either/or
async function getPokemonCustom(input) {
  //all parameters in Javascript are optional, will be undefined if not specified
  if (!isNaN(input)) {
    //need to catch error another way, throw?
    if (typeof input != "string" || !(input instanceof String)) {
      throw "Invalid input, please enter an ID # or name.";
    }
  }
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + `${input}`;
  console.log("ID: " + `${input}` + ":" + "\n");
  await apiObject(apiUrl);
}

// Run getPokemon on start
//getPokemon();

//takes in id OR string name

// Failed Commands
//  ================
// getPokemonCustom(5);
// getPokemonCustom("Charizard");
// getPokemon("bulbasaur");

// Works
// ================
// getPokemon("5");

/*
Write me a function where:

- Pass in the pokemon's id OR name
- You return an object in this format:

    {
        name: pokemon's name,
        id: pokemon's id,
        stats: {
            nameOfStat: valueOfStat,
            nameOfStat: valueOfStat,
        }
        image: pokemon.sprites.front_default
    }
*/
