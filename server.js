//"use strict";
const express = require("express");
const app = express();
const http = require('http');
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTION, PUT, PATCH, DELETE HEAD");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(3000, () => console.log('running on port 3000'));

const fs = require('fs');
const configFile = 'config/config.json';


app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + 'public/scripts'));
app.use('/images', express.static(__dirname + 'public/images'));



// register view engine
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log("Start of /");

    // read config file
        try{
            config = JSON.parse(fs.readFileSync(configFile));   
            console.log("Image Map Coordinates: " + JSON.stringify(config.image_map_coordinates));
            console.log("IP: " + config.camera_ip);
        
            //res.json(jslist);
        } catch(e){
            console.log("Error while reading config: " + e);
    }
    console.log("Done reading from Config file " + configFile);

    res.render("index", {configData: config});
})


app.get('/zoneClicked/:key', async (req, res) => {
    req.params;
    res.json(req.params);




    let cameraUrl = 'http://' + config.camera_ip + '/cgi-bin/ptzctrl.cgi?ptzcmd&poscall&' + req.params.key;
    console.log(cameraUrl);
    http.get(cameraUrl);
    //res.json(zone)
})