const express = require('express');

const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req, res) => {

  res.sendFile(__dirname + "/index.html")
  // res.send("Server is hhfdfdfdfdfdh  and running.")    -< cant have 2 send() method.
});



app.post('/', (req,res) => {

  // console.log(req.body.cityName);
  //install body parser module from CLI TO READ BODY OF THE POST -> npm i body-parser


const query = req.body.cityName;
// const query = "Paris";
  const api_key = "89f6d7a23097482555e26c67ea96a599";
  const units = "metric";


  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api_key + "&units=" + units;
  // const url = "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=89f6d7a23097482555e26c67ea96a599&units=metric";

    https.get(url, (response) => {
      console.log(response.statusCode); //o/p -> 200 

      response.on('data', (data) => {
        // console.log(data);
        const weatherData = JSON.parse(data);
        //  console.log(weatherData); 
        const temp = weatherData.main.temp;
        const weatherSystem = weatherData.sys.type;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        // console.log(temp3);
        // res.send("<h1>The temperature in Lgggondon is " + temp +  " degree celcius.</h1>");   
    // or - write as below code
        res.write(`<h1>The temperature in ` + query + ` is ` + temp +  ` degree celcius.</h1>`);
        // res.write(`<h1>The weather in London is ` + weatherDescription + `. </h1>`);
        res.write("<img src=" + imageURL + " />");//SPACE MUST AFTER IMAGE URL
        // res.write(`<img src=` + imageURL + ` />`);//SPACE MUST AFTER IMAGE URL
        // res.write('<img src=' + imageURL + ' />'); //SPACE MUST AFTER IMAGE URL
        res.send();
        // print the object in javascript object "data" 

      //   const object = {
      //     name: "your_name",
      //     favourtiteFood: "Ramen"
      //   }

      //   console.log(JSON.stringify(object));

       });

    });



});




app.listen(port, () => {
  console.log(`server is running at ${port}`);
});





