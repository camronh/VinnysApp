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
  let pokeObj = {
    name: apiDataResponse.name,
    id: apiDataResponse.id,
    stats: {},
    image: apiDataResponse.sprites.front_default
  }
  //const pokeObj = new Object();
  // pokeObj.name = apiDataResponse.name;
  // pokeObj.id = apiDataResponse.id;
  // pokeObj.stats = {}; //make it an array to print better?
  // //pokeObj.stats = apiDataResponse.stats.
  // pokeObj.image = apiDataResponse.sprites.front_default;
  for (obj of apiDataResponse.stats) {
    pokeObj.stats[obj.stat.name] = obj.base_stat; //for any iteration, need to use bracket instead of dot notation
  }
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
  if (isNaN(input)) {
    console.log("Is String");
    console.log(typeof input);
    const isString = typeof input;

    console.log({ isString });
    console.log({ String: input instanceof String })
    if (isString != "string") { //|| !(input instanceof String)) // if not a string (or number from previous check)
      throw "Invalid input, please enter an ID # or name.";
    } else {
      input = input.toLowerCase();
    }
  }
  //return;
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + `${input}`;
  console.log("ID: " + `${input}` + ":" + "\n");
  await apiObject(apiUrl);
}

// Run getPokemon on start
//getPokemon("charizard");

//takes in id OR string name


// Works
// ================
// getPokemon("5");
// getPokemonCustom(5);
getPokemonCustom("ChaRizard");

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
