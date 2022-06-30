const express = require('express'); //import Express framework
const app = express(); //instantiate Express app
const port = 3000; //set port to listen to requests later

//Get endpoint, set to be on the home page
app.get('/', (req, res) => {
	res.send('Hello World, from express');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))  //start clients
