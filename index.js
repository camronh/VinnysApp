/*

Build me an API

Libraries to use:
express nodemon axios

Endpoints

GET - Get a pokemon's stats
Params: pokemonIdOrName
Returns: Pokemon Object


GET - Get a random pokemon's stats
Params: --
Returns: Pokemon Object


POST - Battle Pokemon
Body: {                                //use body in the code, body's only available in post calls
    challenger: pokemonIdOrName,
    opponent: pokemonIdOrName
}
Returns: The pokemon object with the higher attack

*/
const axios = require("axios");
const express = require('express'); //import Express framework
const cors = require('cors');
const app = express(); //instantiate Express app
const port = process.env.PORT || 3000; //set port of development server

//create an object helper function
async function createObject(apiDataResponse) {
    let pokeObj = {
      name: apiDataResponse.name,
      id: apiDataResponse.id,
      stats: {},
      image: apiDataResponse.sprites.front_default
    }
    for (obj of apiDataResponse.stats) {
      pokeObj.stats[obj.stat.name] = obj.base_stat; //for any iteration, need to use bracket instead of dot notation
    }
    return pokeObj;
  }
  
  //api return object helper function
  async function makeApiObjectCall(apiUrl) {
    const response = await axios.get(apiUrl);
    if (response.status != 200) {
      throw "Request failed. Check input.";
    }
    const { data } = await axios.get(apiUrl);
    const retObj = await createObject(data); //helper function to create object
    return retObj;
   // console.log(JSON.stringify(retObj, null, 2));
  }
  
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
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/" + `${input}`;
    console.log("ID: " + `${input}` + ":" + "\n");
    return await makeApiObjectCall(apiUrl);
  }
  
  async function getPokemonRandom() {
    var randomNumber = Math.floor(Math.random() * 890); //1 - 249 exclusive, for 248 pokemon
    return getPokemonCustom(randomNumber);
  }

app.use(cors({
    origin: '*'
}))

//Get endpoint, set to be on the home page, listens to any
app.get('/getPokemonRandom', async (req, res) => {        
  //res.send(await getPokemonCustom(132));
  const randomPokemon = await getPokemonRandom();
	res.send(randomPokemon);
});

app.get('/getPokemonCustom', async (req, res) => {        //adds onto baseURL
  //res.send(req.query);   //what we allow the user to pass in: ?
  const pokemonID = req.query.pokemonID; //query param or path param ; in the request, get query strings, look for pokemonID one
  //building the interface ^; make API documentation: getPokeCustom endpoint has pokemonID as the query parameter/string(? in the url)

  const customPokemon = await getPokemonCustom(pokemonID);    //could say pokemonId = req.params; req.pathparams
  res.send(customPokemon);
});

app.post('/battlePokemon', async (req, res) => {        //need to pull body out of req (in express endpoint); and pass it into 
  const customPokemon = await getPokemonCustom(132);
  res.send(customPokemon);
});

app.listen(port, () => {     //starts localHost:3000, baseURL is localhost3000
    console.log(`Pokemon API listening on port ${port}!`)  //start clients, check if application is running as intended
}) 




//make the endpoint readable in English
//get
//making a request body in express; req.body